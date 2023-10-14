import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./user.entity";

@Entity("positions")
export class Position {
  @PrimaryGeneratedColumn()
  position_id: number;

  @Column({ type: "varchar", length: 255 })
  position_name: string;

  @ManyToMany(() => Employee, (user) => user.positions)
  users: Employee[];
}
