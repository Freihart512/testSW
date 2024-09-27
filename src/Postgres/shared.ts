import { CreateDateColumn, UpdateDateColumn, Column, DeleteDateColumn } from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn({ update: false })
  created_at: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}



