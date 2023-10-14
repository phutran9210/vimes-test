import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "../../product/entity/product.entity";
import { Receipts } from "./receipts.entity";

@Entity("receipts_details")
export class ReceiptsDetail {
  @PrimaryGeneratedColumn()
  detail_id: number;

  @Column({ type: "integer" })
  actual_quantity: number;

  @Column({ type: "integer" })
  receipts_id: number;

  @Column({ type: "integer" })
  document_quantity: number;

  @Column({ type: "numeric" })
  unit_price: number;

  @Column({ type: "numeric" })
  total_value: number;

  @Column({ type: "character varying" })
  unit_type: string;

  @Column({ type: "character varying", length: 255 })
  receiving_place: string;

  @Column({ type: "boolean" })
  in_debt: Boolean;

  @Column({ type: "character varying", length: 255 })
  receiving_unit: string;

  @Column({ type: "character varying", length: 255 })
  receiving_department: string;

  @ManyToOne(() => Receipts, (receipt) => receipt.receiptsDetails)
  @JoinColumn({ name: "receipts_id" })
  receipt: Receipts;

  @ManyToOne(() => Product, (product) => product.receiptsDetails)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
