import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
} from "class-validator";

export class CreateProduct {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  product_id_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  product_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity_stock: number;
}

export class ProductQuery {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  value: string;
}
