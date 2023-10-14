import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReceiptsDetail } from "../../receipts/entity/receipts-details.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: "varchar", length: 255 })
  product_name: string;

  @Column({ type: "varchar", length: 255 })
  product_id_name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "integer" })
  quantity_stock: number;

  @OneToMany(() => ReceiptsDetail, (receiptsDetail) => receiptsDetail.product)
  receiptsDetails: ReceiptsDetail[];
}
