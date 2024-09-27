import { Entity, Column, PrimaryColumn, ManyToOne, Check, OneToOne, OneToMany, JoinColumn } from "typeorm";
import Person from "./Person";
import Payment from "./Payment";
import { BaseEntity } from "../shared"
import Rent from "./Rent";

@Entity({ name: 'contracts' })
@Check(`"id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'`)
@Check("monthly_price > 0")
@Check("deposit > 0")
export default class Contract extends BaseEntity {
  @PrimaryColumn({ length: "36" })
  id: string;

  @ManyToOne(() => Person, { eager: true })
  tenant: Person;

  @OneToOne(() => Rent, rent => rent.contract)
  @JoinColumn()
  rent: Rent;

  @Column({ type: "timestamp", name: "start_date", update: false })
  startDate: Date;

  @Column({ type: "timestamp", name: "end_Date" })
  endDate: Date;

  @Column({ name: 'monthly_price' })
  monthlyPrice: number;

  @Column()
  deposit: number;

  @OneToMany(() => Payment, payment => payment.contract)
  payments: Payment[];
}

