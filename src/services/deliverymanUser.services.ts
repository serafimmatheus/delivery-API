import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";

type IProps = {
  userName: string;
  password: string;
};

class DeliverymanUserService {
  createDeliverymanUserService = async ({ userName, password }: IProps) => {
    const result = await prisma.deliveryman.findFirst({
      where: {
        userName: {
          equals: userName,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        userName: true,
      },
    });

    if (result) {
      throw new Error("Deliveryman already exists");
    }

    const hashPassword = await hash(password, 10);

    const deliverymanClient = await prisma.deliveryman.create({
      data: {
        userName,
        password: hashPassword,
      },
    });

    return deliverymanClient;
  };

  authenticateDeliverymanUserService = async ({
    userName,
    password,
  }: IProps) => {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        userName,
      },
    });

    if (!deliveryman) {
      throw new Error("User or password invalid");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("User or password invalid");
    }

    const token = sign({ userName }, `${process.env.SECRET_KEY_DELIVERYMAN}`, {
      subject: deliveryman.id,
      expiresIn: "1h",
    });

    return token;
  };

  findAlldeliveriesDeliverymanService = async (id_deliveryman: string) => {
    const result = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
      },

      select: {
        id: true,
        userName: true,
        deliveries: true,
      },
    });

    return result;
  };
}

export default new DeliverymanUserService();
