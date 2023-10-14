import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Position } from "./position.entity";
import { Receipts } from "../../receipts/entity/receipts.entity";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column({ type: "varchar", length: 255 })
  employee_name: string;

  @ManyToMany(() => Position, (position) => position.users)
  @JoinTable({
    name: "employee_positions",
    joinColumn: { name: "employee_id", referencedColumnName: "employee_id" },
    inverseJoinColumn: {
      name: "position_id",
      referencedColumnName: "position_id",
    },
  })
  positions: Position[];

  @OneToMany(() => Receipts, (receipts) => receipts.createdBy)
  createdReceipts: Receipts[];

  @OneToMany(() => Receipts, (receipts) => receipts.warehouseEmployee)
  warehouseReceipts: Receipts[];

  @OneToMany(() => Receipts, (receipts) => receipts.accountantEmployee)
  accountantReceipts: Receipts[];
}
