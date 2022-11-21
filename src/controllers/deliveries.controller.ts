import { Request, Response } from "express";
import { deliveriesServices } from "../services";

class DeliveriesControllers {
  createDeliveriesControllers = async (req: Request, res: Response) => {
    const { id_client } = req;
    const { item_name } = req.body;
    const result = await deliveriesServices.createDeliveriesService({
      item_name,
      id_client,
    });

    return res.json(result);
  };

  findAllWithoutEndDateController = async (req: Request, res: Response) => {
    const result = await deliveriesServices.findAllWithoutEndDateService();

    return res.status(200).json(result);
  };

  updatedDeliverymanController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id_deliveryman } = req;

    const result = await deliveriesServices.updatedDeliveriesService({
      id,
      id_deliveryman,
    });

    res.status(200).json(result);
  };

  findAllDeliverisController = async (req: Request, res: Response) => {
    const { id_client } = req;

    const result = await deliveriesServices.findAllDeliverisService(id_client);

    return res.status(200).json(result);
  };

  updatedDeliveriesEndDateController = async (req: Request, res: Response) => {
    const { id_deliveryman } = req;
    const { id } = req.params;
    const result = await deliveriesServices.updatedDeliveriesEndDateService({
      id,
      id_deliveryman,
    });

    return res.status(200).json(result);
  };
}

export default new DeliveriesControllers();
