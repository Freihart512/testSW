import BaseCustomError from "../../../Shared/valueObjects/BaseCustomError";
export class InvalidRfcError extends BaseCustomError {
  constructor(config: CustomErrorContext) {
    super({
      ...config,
      module: "RFC",
      message: `RFC "${config.value}" is invalid.`,
      name: 'InvalidRfcError'
    })
  }
}

export default class Rfc {
  readonly value: string;

  constructor(value: string, errorContext: string) {
    const rfcValidado = rfcValido(value);
    if (!rfcValidado) {
      throw new InvalidRfcError({
        value,
        context: errorContext,
      })
    }
    this.value = rfcValidado;
  }
}