import { NoEmptyString, PositiveNumber } from "../../../../Shared/valueObjects/primitives";
import Rfc from "../Rfc";
import TaxRegime from "../TaxRegime";

interface personConstructor {
  fiscalName: string,
  rfc: string,
  postalCode: StringOrNumber,
  taxRegime: StringOrNumber,
  name?: string,
}

export default class Person {
  readonly name: string;
  readonly fiscalName: NoEmptyString;
  readonly rfc: Rfc;
  readonly postalCode: PositiveNumber;
  readonly taxRegime: TaxRegime;
  readonly ERROR_CONTEXT = 'Creating Person'

  constructor(config: personConstructor) {
    this.name = config.name || 'Persona Generica';
    this.fiscalName = new NoEmptyString(config.fiscalName, {
      name: 'EmptyFiscalName',
      module: "Person",
      message: "The fiscal name cant not be empty",
      context: this.ERROR_CONTEXT
    })
    this.rfc = new Rfc(config.rfc, this.ERROR_CONTEXT);
    this.postalCode = new PositiveNumber(config.postalCode,
      { message: " Postal Code must be a positive number", module: 'Person', name: 'InvalidPostalCodeError', context: this.ERROR_CONTEXT }
    );
    this.taxRegime = new TaxRegime(config.taxRegime, this.ERROR_CONTEXT);

  }
}