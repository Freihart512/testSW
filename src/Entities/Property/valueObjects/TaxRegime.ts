import BaseCustomError from "../../../Shared/valueObjects/BaseCustomError";
import { PositiveNumber } from "../../../Shared/valueObjects/primitives";

class OutOfRangeTaxRegimeError extends BaseCustomError {
  constructor(config: CustomErrorContext) {
    super({
      ...config,
      module: 'taxRegime',
      message: `taxRegime "${config.value}" shpuld be between 600 and 700.`
    })
  }
}


export default class TaxRegime extends PositiveNumber {

  constructor(value: StringOrNumber, contextToError: string) {
    super(value, { module: 'taxRegime', name: "InvaidTypeTaxRegimeError", context: contextToError })
    if (this.value < 600 && this.value > 700) {
      throw new OutOfRangeTaxRegimeError({ value, context: contextToError })
    }
  }
}