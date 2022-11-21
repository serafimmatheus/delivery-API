import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

type IPropsPayload = {
  sub: string;
};

export async function tokenAlreadyExistsDeliverymanMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      `${process.env.SECRET_KEY_DELIVERYMAN}`
    ) as IPropsPayload;

    req.id_deliveryman = sub;
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  return next();
}
