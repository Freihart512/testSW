import BaseCustomError from "../BaseCustomError";
export class EmptyStringError extends BaseCustomError {
  constructor(errorContext: CustomErrorContext) {
    super({
      message: errorContext.message || `String value cannot be empty.`,
      module: errorContext.module || 'NoEmptyString',
      value: errorContext.value,
      name: errorContext.name || 'EmptyStringError',
      context: errorContext.context,
    });
    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}

export default class NoEmptyString {
  readonly value: string
  constructor(value: string, errorContext: Omit<CustomErrorContext, 'value'>) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new EmptyStringError({ ...errorContext, value })
    }
    this.value = value;
  }
}