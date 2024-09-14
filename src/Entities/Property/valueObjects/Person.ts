import { NoEmptyString, PositiveNumber } from "../../../Shared/valueObjects/primitives";
import Rfc from "./Rfc";
import TaxRegime from "./taxRegime";

interface personConstructor {
  fiscalName: string,
  rfc: string,
  postalCode: string,
  taxRegime: defaultTypeParameter,
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
    this.fiscalName = new NoEmptyString(config.fiscalName, this.ERROR_CONTEXT)
    this.rfc = new Rfc(config.rfc, this.ERROR_CONTEXT);
    this.postalCode = new PositiveNumber(config.postalCode,
      { module: 'Person', name: 'InvalidPostalCodeError', context: this.ERROR_CONTEXT }
    );
    this.taxRegime = new TaxRegime(config.taxRegime, this.ERROR_CONTEXT);

  }
}