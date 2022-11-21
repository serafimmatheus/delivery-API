import { Router } from "express";
import { deliveriesController } from "../controllers";
import { tokenAlreadyExistsMiddleware } from "../middlewares/tokenAlreadyExists.middleware";
import { tokenAlreadyExistsDeliverymanMiddleware } from "../middlewares/tokenAlreadyExistsDeliveryman.middleware";

export const routes = Router();

routes.post(
  "/delivery",
  tokenAlreadyExistsMiddleware,
  deliveriesController.createDeliveriesControllers
);

routes.get(
  "/delivery",
  tokenAlreadyExistsDeliverymanMiddleware,
  deliveriesController.findAllWithoutEndDateController
);

routes.patch(
  "/delivery/:id",
  tokenAlreadyExistsDeliverymanMiddleware,
  deliveriesController.updatedDeliverymanController
);

routes.patch(
  "/delivery/finaly/:id",
  tokenAlreadyExistsDeliverymanMiddleware,
  deliveriesController.updatedDeliveriesEndDateController
);
