import NoEmptyString, { EmptyStringError } from './';

describe('NoEmptyString Value Object', () => {

  it('should create a NoEmptyString instance with a valid non-empty string', () => {
    const validString = 'Test String';
    const noEmptyString = new NoEmptyString(validString, {
      module: 'TestModule',
      context: 'Creating a valid NoEmptyString',
    });

    expect(noEmptyString.value).toBe(validString);
  });

  it('should throw EmptyStringError if value is an empty string', () => {
    const emptyString = '';

    expect(() => {
      new NoEmptyString(emptyString, { module: 'TestModule', context: 'Testing empty string' });
    }).toThrow(EmptyStringError);

    try {
      new NoEmptyString(emptyString, { context: 'Testing empty string' });
    } catch (error: any) {
      expect(error).toBeInstanceOf(EmptyStringError);
      expect(error.message).toBe('String value cannot be empty.');
      expect(error.module).toBe('NoEmptyString');
      expect(error.name).toBe('EmptyStringError');
      // value must be default because base error take a default value when !value
      expect(error.value).toBe('value does not exist');
      expect(error.context).toBe('Testing empty string');
    }
  });

  it('should throw EmptyStringError if value is a string with only whitespace', () => {
    const whitespaceString = '   ';

    expect(() => {
      new NoEmptyString(whitespaceString, { module: 'TestModule', context: 'Testing whitespace string' });
    }).toThrow(EmptyStringError);

    try {
      new NoEmptyString(whitespaceString, { module: 'TestModule', context: 'Testing whitespace string' });
    } catch (error: any) {
      expect(error).toBeInstanceOf(EmptyStringError);
      expect(error.message).toBe('String value cannot be empty.');
      expect(error.module).toBe('TestModule');
      expect(error.name).toBe('EmptyStringError');
      expect(error.value).toBe(whitespaceString);
      expect(error.context).toBe('Testing whitespace string');
    }
  });

  it('should throw EmptyStringError if value is not a string', () => {
    const nonStringValue = 12345; // Not a string

    expect(() => {
      new NoEmptyString(nonStringValue as any, { module: 'TestModule', context: 'Testing non-string value' });
    }).toThrow(EmptyStringError);

    try {
      new NoEmptyString(nonStringValue as any, { module: 'TestModule', context: 'Testing non-string value' });
    } catch (error: any) {
      expect(error).toBeInstanceOf(EmptyStringError);
      expect(error.message).toBe('String value cannot be empty.');
      expect(error.module).toBe('TestModule');
      expect(error.name).toBe('EmptyStringError');
      expect(error.value).toBe(nonStringValue);
      expect(error.context).toBe('Testing non-string value');
    }
  });
});
