export default class BaseCustomError extends Error {
  readonly module: string;
  readonly value?: any;
  readonly name: string;
  readonly context?: string;
  constructor(config: BaseCustomErrorConfig) {
    super(config.message);
    this.module = config.module;
    this.value = config.value;
    this.name = config.name || '';
    this.context = config.context;
    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }
}