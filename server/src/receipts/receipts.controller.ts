import express, { Router, Request, Response, NextFunction } from "express";
import * as receiptsService from "./receipts.service";
import { validate } from "class-validator";
import { FormData } from "./dto/receipts-dto";

const receiptsRouter: Router = express.Router();

receiptsRouter.post("/", async (req: Request, res: Response) => {
  const receiptsData = Object.assign(new FormData(), req.body);

  const errors = await validate(receiptsData);
  if (errors.length > 0) {
    res.status(422).send(errors);
  } else {
    try {
      const response = await receiptsService.createReceipts(
        receiptsData.receipts,
        receiptsData.receiptsDetail
      );
      const data = {
        status: 201,
        result: response,
      };
      res.send(data);
    } catch (error: any) {
      console.error(error);
    }
  }
});

export default receiptsRouter;
