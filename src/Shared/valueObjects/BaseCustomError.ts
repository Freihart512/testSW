export default abstract class BaseCustomError extends Error {
  readonly module: string;
  readonly value?: unknown;
  readonly name: string;
  readonly context: string;
  constructor(config: CustomErrorContext) {
    super(config.message || 'This is a Base Custom Error Message. please add context where you are implementing this');
    this.module = config.module || 'BaseCustomError';
    this.value = config.value || 'value does not exist';
    this.name = config.name || 'BaseCustomError';
    this.context = config.context || '';
    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }
}