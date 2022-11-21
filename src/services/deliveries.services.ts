import { prisma } from "../database/prismaClient";

type IProps = {
  id_client: string;
  item_name: string;
};

type IPropsDeliveriesUpdated = {
  id: string;
  id_deliveryman: string;
};

class DeliveriesService {
  createDeliveriesService = async ({ item_name, id_client }: IProps) => {
    const result = await prisma.deliveries.create({
      data: {
        id_client,
        item_name,
      },
    });

    return result;
  };

  findAllWithoutEndDateService = async () => {
    const deliveriesNull = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveriesNull;
  };

  updatedDeliveriesService = async ({
    id,
    id_deliveryman,
  }: IPropsDeliveriesUpdated) => {
    const result = await prisma.deliveries.update({
      where: {
        id,
      },
      data: {
        id_deliveryman,
      },
    });

    return result;
  };

  findAllDeliverisService = async (id_client: string) => {
    const result = await prisma.clients.findMany({
      where: {
        id: id_client,
      },
      select: {
        id: true,
        userName: true,
        deliveries: true,
      },
    });

    return result;
  };

  updatedDeliveriesEndDateService = async ({
    id,
    id_deliveryman,
  }: IPropsDeliveriesUpdated) => {
    const result = await prisma.deliveries.updateMany({
      where: {
        id,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    return result;
  };
}

export default new DeliveriesService();
