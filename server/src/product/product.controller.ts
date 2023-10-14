import express, { Router, Request, Response, NextFunction } from "express";
import * as productService from "./product.service";
import { CreateProduct, ProductQuery } from "./dto/product-dto";
import { validate } from "class-validator";

const productRouter: Router = express.Router();

productRouter.post("/", async (req: Request, res: Response) => {
  const product = Object.assign(new CreateProduct(), req.body);
  const errors = await validate(product);

  if (errors.length > 0) {
    res.status(422).send(errors);
  } else {
    try {
      const result = await productService.addNewProduct(
        product.product_name,
        product.product_id_name,
        +product.quantity_stock,
        product.description
      );
      const data = {
        status: 201,
        result: result,
      };
      res.send(data);
    } catch (error: any) {
      if (error.message === "Product ID is extisted") {
        return res.status(409).send(error.message);
      }

      res.status(500).send("Internal Server Error");
    }
  }
});

productRouter.get("/product-id-name", async (req: Request, res: Response) => {
  const queryObj = Object.assign(new ProductQuery(), {
    value: req.query.value,
  });

  const errors = await validate(queryObj);
  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }
  try {
    const result = await productService.getProductByProductIdName(
      queryObj.value
    );
    const data = {
      status: 200,
      result: result,
    };
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default productRouter;
