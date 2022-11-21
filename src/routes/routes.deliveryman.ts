import { deliverymanUserControllers } from "../controllers";
import { Router } from "express";
import { tokenAlreadyExistsDeliverymanMiddleware } from "../middlewares/tokenAlreadyExistsDeliveryman.middleware";

export const routes = Router();

routes.post(
  "/deliveryman",
  deliverymanUserControllers.createDeliverymanController
);

routes.post(
  "/deliveryman/authenticate",
  deliverymanUserControllers.authenticateDeliverymanController
);

routes.get(
  "/deliveryman/deliveries",
  tokenAlreadyExistsDeliverymanMiddleware,
  deliverymanUserControllers.findAlldeliveriesDeliverymanService
);
