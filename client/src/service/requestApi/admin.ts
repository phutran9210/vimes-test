import request from "../request";
import { EmployeeInfo } from "../../components/employee/Employee";
import { Product } from "../../components/product/Product";
import { FormData } from "../../components/receipts/Receipts";

export const getPosition = async () => {
  return request.get("/api/v1/users/position");
};

export const getEmployeeByPosition = async () => {
  return request.get("/api/v1/users/employee-by-position");
};

export const searchProductName = async (value: string) => {
  return request.get(`/api/v1/products/product-id-name?value=${value}`);
};

export const createEmployee = async (values: EmployeeInfo) => {
  return request.post("/api/v1/users", values);
};

export const createReceipts = async (values: FormData) => {
  return request.post("/api/v1/receipts", values);
};

export const createProduct = async (values: Product) => {
  return request.post("/api/v1/products", values);
};
