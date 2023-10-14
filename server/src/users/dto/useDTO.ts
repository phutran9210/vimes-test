import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class CreateEmployee {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  employee_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  position_name: string;
}
