import BaseCustomError from '../BaseCustomError';

// Clase de ejemplo para instanciar BaseCustomError ya que es abstracta
class ExampleCustomError extends BaseCustomError {
  constructor(config: CustomErrorContext) {
    super(config);
  }
}

describe('BaseCustomError', () => {
  it('should create an error with default values if no config is provided', () => {
    const error = new ExampleCustomError({});

    expect(error.message).toBe('This is a Base Custom Error Message. Please add context where you are implementing this.');
    expect(error.module).toBe('BaseCustomError');
    expect(error.value).toBe('value does not exist');
    expect(error.name).toBe('BaseCustomError');
    expect(error.context).toBe('');
  });

  it('should create an error with custom values', () => {
    const customConfig: CustomErrorContext = {
      message: 'Custom error message',
      module: 'CustomModule',
      value: 12345,
      name: 'CustomError',
      context: 'Custom context for testing',
    };

    const error = new ExampleCustomError(customConfig);

    expect(error.message).toBe('Custom error message');
    expect(error.module).toBe('CustomModule');
    expect(error.value).toBe(12345);
    expect(error.name).toBe('CustomError');
    expect(error.context).toBe('Custom context for testing');
  });

  it('should handle missing values gracefully', () => {
    const customConfig: CustomErrorContext = {
      message: 'Partially defined error',
      value: null,
    };

    const error = new ExampleCustomError(customConfig);

    expect(error.message).toBe('Partially defined error');
    expect(error.module).toBe('BaseCustomError'); // Defaults to 'BaseCustomError'
    expect(error.value).toBe('value does not exist');
    expect(error.name).toBe('BaseCustomError'); // Defaults to 'BaseCustomError'
    expect(error.context).toBe(''); // Defaults to an empty string
  });

  it('should have the correct prototype chain', () => {
    const error = new ExampleCustomError({});

    expect(error).toBeInstanceOf(Error);
    expect(Object.getPrototypeOf(error)).toBe(ExampleCustomError.prototype);
  });
});
