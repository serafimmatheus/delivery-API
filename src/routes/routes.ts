import { Express } from "express";
import { routes as routesUsers } from "./routes.users";
import { routes as routesDeliveryman } from "./routes.deliveryman";
import { routes as routesDeliveries } from "./routes.deliveries";

export function initApp(app: Express) {
  app.use(routesUsers);
  app.use(routesDeliveryman);
  app.use(routesDeliveries);
}
