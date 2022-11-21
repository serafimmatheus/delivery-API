import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

type IPropsPayload = {
  sub: string;
};

export async function tokenAlreadyExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  //   const { subject } = verify(token, `${process.env.SECRET_KEY}`, (err) => {
  //     if (err) {
  //
  //     }
  //   });

  try {
    const { sub } = verify(token, `${process.env.SECRET_KEY}`) as IPropsPayload;

    req.id_client = sub;
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid" });
  }

  return next();
}
