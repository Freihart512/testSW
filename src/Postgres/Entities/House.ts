import { Entity, Column, PrimaryColumn, OneToMany, Check, ManyToOne } from 'typeorm';
import Rent from './Rent';
import Person from './Person';
import { BaseEntity } from '../shared';

@Entity({ name: 'houses' })
@Check(`"id" ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-9][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'`)
export default class House extends BaseEntity {
  @PrimaryColumn({ length: "36" })
  id: string;

  @ManyToOne(() => Person, { eager: true })
  owner: Person;

  @Column({ name: 'property_tax_account' })
  propertyTaxAccount: number;

  @Column({ nullable: true })
  alias: string;

  @OneToMany(() => Rent, (rent) => rent.house, { eager: true })
  rents: Rent[];
}
