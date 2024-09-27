import { Entity, Column, PrimaryColumn, Check } from "typeorm"
import { BaseEntity } from "../shared"

@Entity({ name: 'persons' })
@Check(`char_length(rfc) >= 13`)
@Check(`"tax_regime" BETWEEN 600 AND 700`)
@Check("postal_Code > 10000")
export default class Person extends BaseEntity {
  @PrimaryColumn({ length: "20" })
  rfc: string

  @Column({ name: 'fiscal_name' })
  fiscalName: string

  @Column({ width: 3, name: 'tax_regime' })
  taxRegime: number

  @Column({ name: 'postal_code' })
  postalCode: number

  @Column({ nullable: true })
  name: string

}