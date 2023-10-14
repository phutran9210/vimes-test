import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ReceiptsDetail } from "./receipts-details.entity";
import { Employee } from "../../users/entity/user.entity";

@Entity("receipts")
export class Receipts {
  @PrimaryGeneratedColumn()
  receipts_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  receipts_date: Date;

  @Column({ type: "varchar", length: 255 })
  delivery_persons: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: "created_by_employee_id" })
  createdBy: Employee;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: "warehouse_employee_id" })
  warehouseEmployee: Employee;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: "accounttant_employee_id" })
  accountantEmployee: Employee;

  @Column({ type: "text" })
  receipts_notes: string;

  @OneToMany(() => ReceiptsDetail, (receiptsDetails) => receiptsDetails.receipt)
  receiptsDetails: ReceiptsDetail[];
}
