import { AppDataSource } from "../database/dataSource";
import { Product } from "./entity/product.entity";
import * as stringSimilarity from "string-similarity";

class ProductWithSimilarity extends Product {
  similarity?: number;
}

const productService = AppDataSource.getRepository(Product);

const addNewProduct = async (
  product_name: string,
  product_id_name: string,
  quantity_stock: number,
  description?: string
) => {
  const extistProduct = await productService
    .createQueryBuilder("product")
    .where("product.product_id_name =:product_id_name", {
      product_id_name: product_id_name,
    })
    .getOne();

  if (extistProduct) {
    throw new Error("Product ID is extisted");
  }

  const newProduct = productService.create({
    product_id_name: product_id_name,
    product_name: product_name,
    quantity_stock: quantity_stock,
    description: description,
  });

  const addedProduct = await productService.save(newProduct);

  return addedProduct;
};

const getProductByProductIdName = async (value: string) => {
  const searchTerm = value.toLowerCase().trim();

  const products = productService
    .createQueryBuilder("product")
    .select([
      "product.product_id",
      "product.product_name",
      "product.product_id_name",
    ])
    .where(`LOWER(product.product_id_name) LIKE :searchTerm`, {
      searchTerm: `%${searchTerm}%`,
    });
  // .getMany();

  const tranformResult = (await products.getMany()) as ProductWithSimilarity[];

  tranformResult.forEach((product) => {
    product.similarity = stringSimilarity.compareTwoStrings(
      searchTerm,
      product.product_id_name
    );
  });

  tranformResult.sort((a, b) => b.similarity! - a.similarity!);
  return tranformResult;
};

export { addNewProduct, getProductByProductIdName };
