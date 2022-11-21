import { Router } from "express";
import { clientUserControllers, deliveriesController } from "../controllers";
import { tokenAlreadyExistsMiddleware } from "../middlewares/tokenAlreadyExists.middleware";

export const routes = Router();

routes.post("/clients", clientUserControllers.createUserControllers);
routes.post("/clients/authenticate", clientUserControllers.authenticateClient);

routes.get(
  "/client/deliveries",
  tokenAlreadyExistsMiddleware,
  deliveriesController.findAllDeliverisController
);
