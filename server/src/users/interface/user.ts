export class PositionInterface {
  position_id: number;
  position_name: string;
}

export class EmployeeInterface {
  employee_id: number;
  employee_name: string;
  positions: PositionInterface[];
}
