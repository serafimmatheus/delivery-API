import { Request, Response } from "express";
import { deliverymanUserServices } from "../services";

class DeliverymanUserControllers {
  createDeliverymanController = async (req: Request, res: Response) => {
    const deliveryman =
      await deliverymanUserServices.createDeliverymanUserService(req.body);

    return res.status(201).json(deliveryman);
  };

  authenticateDeliverymanController = async (req: Request, res: Response) => {
    const auth =
      await deliverymanUserServices.authenticateDeliverymanUserService(
        req.body
      );

    return res.json(auth);
  };

  findAlldeliveriesDeliverymanService = async (req: Request, res: Response) => {
    const { id_deliveryman } = req;

    const result =
      await deliverymanUserServices.findAlldeliveriesDeliverymanService(
        id_deliveryman
      );

    res.status(200).json(result);
  };
}

export default new DeliverymanUserControllers();
