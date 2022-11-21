import { Request, Response } from "express";
import { clientUserServices } from "../services";

class ClientUserControllers {
  createUserControllers = async (req: Request, res: Response) => {
    const client = await clientUserServices.createdUserClient(req.body);

    return res.status(201).json(client);
  };

  authenticateClient = async (req: Request, res: Response) => {
    const authClient = await clientUserServices.authenticateClient(req.body);

    return res.json(authClient);
  };
}

export default new ClientUserControllers();
