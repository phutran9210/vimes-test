import { Employee } from "./entity/user.entity";
import { Position } from "./entity/position.entity";
import { AppDataSource } from "../database/dataSource";
import { EmployeeInterface, PositionInterface } from "./interface/user";

//service
const userService = AppDataSource.getRepository(Employee);
const positionService = AppDataSource.getRepository(Position);

const createEmployee = async (
  employee_name: string,
  position_name: string
): Promise<{
  status?: number;
  message?: string;
  result?: EmployeeInterface;
}> => {
  const existingEmployee = await userService
    .createQueryBuilder("employee")
    .where("employee.employee_name =:employee_name", {
      employee_name: employee_name,
    })
    .getOne();

  if (existingEmployee) {
    throw new Error("Employee name already exists");
  }

  let defaultPosition = await positionService.findOne({
    where: { position_name: "employee" },
  });

  if (!defaultPosition) {
    const position = positionService.create({ position_name: "employee" });
    defaultPosition = await positionService.save(position);
  }

  const specifiedPosition = await positionService.findOne({
    where: { position_name: position_name },
  });

  if (!specifiedPosition) {
    throw new Error("Position not found");
  }

  const positionsToAssign = [defaultPosition];

  if (specifiedPosition.position_name !== "employee") {
    positionsToAssign.push(specifiedPosition);
  }

  const newEmployee = userService.create({
    employee_name: employee_name,
    positions: positionsToAssign,
  });

  const createdEmployee = await userService.save(newEmployee);

  return {
    status: 200,
    result: createdEmployee,
  };
};

//lấy position
const getPosition = async (): Promise<{
  status: number;
  result: PositionInterface[];
}> => {
  const positions = await positionService.find();
  return {
    status: 200,
    result: positions,
  };
};

//lấy thông tin nhân viên

const getEmployByPosition = async (): Promise<{
  allEmployee: EmployeeInterface[];
  warehouseEmployee: EmployeeInterface[];
  accounttantEmployee: EmployeeInterface[];
}> => {
  const allEmployee = await getEmployeesByPositionName("employee");
  const warehouseEmployee = await getEmployeesByPositionName("warehouse");
  const accounttantEmployee = await getEmployeesByPositionName("accounttant");

  return {
    allEmployee: allEmployee,
    warehouseEmployee: warehouseEmployee,
    accounttantEmployee: accounttantEmployee,
  };
};
export { createEmployee, getPosition, getEmployByPosition };

//helper
const getEmployeesByPositionName = async (positionName: string) => {
  return await userService
    .createQueryBuilder("employee")
    .innerJoinAndSelect("employee.positions", "position")
    .where("position.position_name = :position_name", {
      position_name: positionName,
    })
    .getMany();
};
