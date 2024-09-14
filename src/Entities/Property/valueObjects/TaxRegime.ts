import BaseCustomError from "../../../Shared/valueObjects/BaseCustomError";
import { PositiveNumber } from "../../../Shared/valueObjects/primitives";

type InvalidRfcErrorConfig = WithRequired<Pick<BaseCustomErrorConfig, 'value' | 'context'>, 'value'>

class InvalidTaxRegimeError extends BaseCustomError {
  constructor(config: InvalidRfcErrorConfig) {
    super({
      ...config,
      module: 'taxRegime',
      message: `taxRegime "${config.value}" is invalid.`
    })
  }
}


export default class TaxRegime extends PositiveNumber {

  constructor(value: defaultTypeParameter, contextToError: string) {
    try {
      super(value, { module: 'taxRegime' })
      if (this.value < 600 && this.value > 700) {
        throw new Error('')
      }
    } catch {
      throw new InvalidTaxRegimeError({ context: contextToError, value })
    }
  }
}