import { Entity, Column, PrimaryColumn, OneToOne, Check, ManyToOne, JoinColumn } from "typeorm";
import House from "./House";
import Contract from "./Contract";
import { BaseEntity } from "../shared"


@Entity({ name: 'rents' })
@Check(`"id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'`)
@Check("monthly_price > 0")
@Check("deposit > 0")
export default class Rent extends BaseEntity {
  @PrimaryColumn({ length: "36" })
  id: string;

  @ManyToOne(() => House)
  house: House;

  @OneToOne(() => Contract, contract => contract.rent, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn()
  contract: Contract;

  @Column({ type: "timestamp", name: "start_date", update: false })
  startDate: Date;

  @Column({ type: "timestamp", name: "end_date" })
  endDate: Date;

  @Column({ name: 'monthly_price' })
  monthlyPrice: number;

  @Column()
  deposit: number;

  @Column({ update: false, name: "is_available" })
  isAvailable: boolean;

}
