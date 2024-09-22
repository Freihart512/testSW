import PositiveNumber, { InvalidPositiveNumberError } from './';

describe('PositiveNumber Value Object', () => {

  it('should create a PositiveNumber instance with a valid positive number', () => {
    const validNumber = 10;
    const positiveNumber = new PositiveNumber(validNumber, { module: 'TestModule', context: 'Creating a valid PositiveNumber' });

    expect(positiveNumber.value).toBe(validNumber);
  });

  it('should create a PositiveNumber instance with a valid string number', () => {
    const validStringNumber = '20';
    const positiveNumber = new PositiveNumber(validStringNumber, { module: 'TestModule', context: 'Creating a valid PositiveNumber from string' });

    expect(positiveNumber.value).toBe(Number(validStringNumber));
  });

  it('should create a PositiveNumber instance with a value of 0', () => {
    const zeroValue = 0;
    const positiveNumber = new PositiveNumber(zeroValue, { module: 'TestModule', context: 'Creating a valid PositiveNumber with zero' });

    expect(positiveNumber.value).toBe(zeroValue);
  });

  it('should throw InvalidPositiveNumberError for a negative number', () => {
    const negativeNumber = -5;

    expect(() => {
      new PositiveNumber(negativeNumber, { module: 'TestModule', context: 'Testing negative number' });
    }).toThrow(InvalidPositiveNumberError);

    try {
      new PositiveNumber(negativeNumber, { context: 'Testing negative number' });
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidPositiveNumberError);
      expect(error.message).toBe(`The provided value "${negativeNumber}" is not a valid positive number. Expected a positive number greater or equal to 0`);
      expect(error.module).toBe('PositiveNumber');
      expect(error.value).toBe(negativeNumber);
      expect(error.context).toBe('Testing negative number');
    }
  });

  it('should throw InvalidPositiveNumberError for NaN', () => {
    const invalidValue = 'invalid number';

    expect(() => {
      new PositiveNumber(invalidValue, { module: 'TestModule', context: 'Testing NaN value' });
    }).toThrow(InvalidPositiveNumberError);

    try {
      new PositiveNumber(invalidValue, { module: 'TestModule', context: 'Testing NaN value' });
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidPositiveNumberError);
      expect(error.message).toBe(`The provided value "${invalidValue}" is not a valid positive number. Expected a positive number greater or equal to 0`);
      expect(error.module).toBe('TestModule');
      expect(error.value).toBe(invalidValue);
      expect(error.context).toBe('Testing NaN value');
    }
  });

});
