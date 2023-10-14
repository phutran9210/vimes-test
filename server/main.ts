import express, { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./src/database/dataSource";
import usersRouter from "./src/users/users.controller";
import productRouter from "./src/product/product.controller";
import receiptsRouter from "./src/receipts/receipts.controller";
dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/receipts", receiptsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
