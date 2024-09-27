export enum RowStatus {
  ACTIVE = "pending",
  DELETE = "completed",
}


import { CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn({ update: false })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: "enum",
    enum: RowStatus,
    default: RowStatus.ACTIVE,
  })
  register_status: RowStatus;
}



