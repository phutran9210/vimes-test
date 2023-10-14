import express, { Router, Request, Response, NextFunction } from "express";
import * as userService from "./users.service";
import { validate } from "class-validator";
import { CreateEmployee } from "./dto/useDTO";

const userRouter: Router = express.Router();

//tạo mới employee
userRouter.post("/", async (req: Request, res: Response) => {
  const employee = Object.assign(new CreateEmployee(), req.body);
  const errors = await validate(employee);

  if (errors.length > 0) {
    res.status(422).send(errors);
  } else {
    try {
      const result = await userService.createEmployee(
        employee.employee_name,
        employee.position_name
      );
      res.send(result);
    } catch (error: any) {
      if (error.message === "Employee name already exists") {
        return res.status(409).send(error.message);
      }
      if (error.message === "Position not found") {
        return res.status(404).send(error.message);
      }

      res.status(500).send("Internal Server Error");
    }
  }
});

//lấy position
userRouter.get("/position", async (req: Request, res: Response) => {
  try {
    const result = await userService.getPosition();
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//lấy nhân viên thei position
userRouter.get("/employee-by-position", async (req: Request, res: Response) => {
  try {
    const result = await userService.getEmployByPosition();
    const data = { status: 200, result: result };
    res.send(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default userRouter;
