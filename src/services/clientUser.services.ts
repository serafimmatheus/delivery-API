import { prisma } from "../database/prismaClient";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

type IProps = {
  userName: string;
  password: string;
};

class ClientUserServices {
  getAllUserClient = () => {};

  createdUserClient = async ({ userName, password }: IProps) => {
    const result = await prisma.clients.findFirst({
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
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        userName,
        password: hashPassword,
      },
    });

    return client;
  };
  findOneUserClient = () => {};
  updatedUserClient = () => {};
  deletedUserClient = () => {};

  authenticateClient = async ({ userName, password }: IProps) => {
    const client = await prisma.clients.findFirst({
      where: {
        userName,
      },
    });

    if (!client) {
      throw new Error("User or password invalid");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("User or password invalid");
    }

    const token = sign({ userName }, `${process.env.SECRET_KEY}`, {
      subject: client.id,
      expiresIn: "1h",
    });

    return token;
  };
}

export default new ClientUserServices();
