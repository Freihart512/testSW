import { Entity, PrimaryColumn, Column, ManyToOne, Check } from 'typeorm';
import Contract from './Contract';
import { BaseEntity } from '../shared';

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  DUE = "due",
}

export enum PaymentType {
  RENT = "rent",
  DEPOSIT = "deposit",
}

@Entity({ name: 'payments' })
@Check(`"id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'`)
@Check("amount > 0")
export default class Payment extends BaseEntity {
  @PrimaryColumn({ length: "36" })
  id: string;

  @ManyToOne(() => Contract, contract => contract.payments, { onDelete: "CASCADE" })
  contract: Contract;

  @Column()
  amount: number;

  @Column({type: "timestamp"})
  date: Date;

  @Column({
    type: "enum",
    enum: PaymentType,
    default: PaymentType.RENT,
    name:'payment_type'
  })
  paymentType: PaymentType;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    name:'payment_status'
  })
  paymentStatus: PaymentStatus;
}
