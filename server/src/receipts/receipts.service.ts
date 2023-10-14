import { AppDataSource } from "../database/dataSource";
import { Product } from "../product/entity/product.entity";
import { Receipts } from "./entity/receipts.entity";
import { ReceiptsDetail } from "./entity/receipts-details.entity";
import { Employee } from "../users/entity/user.entity";
import { ReceiptsDTO, ReceiptsDetailDTO } from "./dto/receipts-dto";

const productService = AppDataSource.getRepository(Product);
const receiptsService = AppDataSource.getRepository(Receipts);
const receiptsDetailService = AppDataSource.getRepository(ReceiptsDetail);
const employeeService = AppDataSource.getRepository(Employee);

const createReceipts = async (
  receipts: ReceiptsDTO,
  receiptsDetail: ReceiptsDetailDTO
) => {
  try {
    const createdBy = await getEmployeeWithRole(
      receipts.created_by_employee_id
    );
    const warehouseEmployee = await getEmployeeWithRole(
      receipts.warehouse_employee_id,
      "warehouse"
    );
    const accountantEmployee = await getEmployeeWithRole(
      receipts.accounttant_employee_id,
      "accounttant"
    );

    const existProduct = await productService.findOne({
      where: { product_id: receiptsDetail.product_id },
    });
    if (!existProduct) {
      throw new Error("Product not found");
    }

    const newReceipt = receiptsService.create({
      delivery_persons: receipts.delivery_persons,
      receipts_notes: receipts.receipts_notes,
      createdBy: createdBy,
      warehouseEmployee: warehouseEmployee,
      accountantEmployee: accountantEmployee,
    });
    const addedReceipts = await receiptsService.save(newReceipt);

    const newReceiptDetails = receiptsDetailService.create({
      actual_quantity: receiptsDetail.actual_quantity,
      document_quantity: receiptsDetail.document_quantity,
      in_debt: receiptsDetail.debt,
      receiving_department: receiptsDetail.receiving_department,
      receiving_place: receiptsDetail.receiving_place,
      receiving_unit: receiptsDetail.receiving_unit,
      unit_price: receiptsDetail.unit_price,
      unit_type: receiptsDetail.unit_type,
      product: existProduct,
      receipt: addedReceipts,
    });
    const addedReceiptsDetail = await receiptsDetailService.save(
      newReceiptDetails
    );

    existProduct.quantity_stock += receiptsDetail.actual_quantity;
    await productService.save(existProduct);

    const result = {
      receipts: addedReceipts,
      receiptsDetail: addedReceiptsDetail,
    };

    return result;
  } catch (error: any) {
    console.error(error);
    return { status: 500, message: error.message };
  }
};

export { createReceipts };

//kiểm tra quyền
async function getEmployeeWithRole(employeeId: number, roleName?: string) {
  const employee = await employeeService.findOne({
    where: { employee_id: +employeeId },
    relations: ["positions"],
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  const isWarehouse = employee.positions.some(
    (position) => position.position_name === roleName
  );

  if (roleName && !isWarehouse) {
    throw new Error("Deny access");
  }

  return employee;
}
