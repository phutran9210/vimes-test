import {
  IsString,
  IsInt,
  IsBoolean,
  IsNotEmpty,
  Min,
  MaxLength,
} from "class-validator";

export class ReceiptsDTO {
  @IsNotEmpty()
  @IsString()
  delivery_persons: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  receipts_notes: string;

  @IsInt()
  created_by_employee_id: number;

  @IsInt()
  warehouse_employee_id: number;

  @IsInt()
  accounttant_employee_id: number;
}

export class ReceiptsDetailDTO {
  @IsInt()
  @Min(0) // Assuming quantity can't be negative
  actual_quantity: number;

  @IsBoolean()
  debt: boolean;

  @IsInt()
  @Min(0)
  document_quantity: number;

  @IsInt()
  @Min(0)
  unit_price: number;

  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  product_id_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  receipts_notes: string;

  @IsNotEmpty()
  @IsString()
  receiving_department: string;

  @IsNotEmpty()
  @IsString()
  receiving_place: string;

  @IsNotEmpty()
  @IsString()
  receiving_unit: string;

  @IsNotEmpty()
  @IsString()
  unit_type: string;
}

export class FormData {
  @IsNotEmpty()
  receipts: ReceiptsDTO;

  @IsNotEmpty()
  receiptsDetail: ReceiptsDetailDTO;
}
