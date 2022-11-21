import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { initApp } from "./routes/routes";

const app = express();
app.use(express.json());

initApp(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(5001, () => {
  console.log(`Server is Running -> Port ${5001}`);
});
