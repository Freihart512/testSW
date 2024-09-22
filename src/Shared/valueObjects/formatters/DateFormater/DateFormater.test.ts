import { InvalidDateError, DateFormatter } from './';

describe('DateFormatter', () => {

  it('should format a valid Date object correctly', () => {
    const date = new Date('2024-09-15T00:00:00Z');
    const formatter = new DateFormatter('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const result = formatter.format(date);

    expect(result).toEqual({
      miliseconds: date.getTime(),
      formatted: 'Sep 15, 2024'
    });
  });

  it('should format a valid timestamp correctly', () => {
    const timestamp = new Date('2024-09-15T00:00:00Z').getTime();
    const formatter = new DateFormatter();

    const result = formatter.format(timestamp);

    expect(result).toEqual({
      miliseconds: timestamp,
      formatted: '15 de septiembre de 2024'
    });
  });

  it('should throw InvalidDateError for an invalid Date object', () => {
    const invalidDate = new Date('invalid-date');
    const formatter = new DateFormatter();

    expect(() => {
      formatter.format(invalidDate);
    }).toThrow(InvalidDateError);

    try {
      formatter.format(invalidDate);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidDateError);
      expect(error.message).toBe(`The provided date "${invalidDate}" is invalid.`);
    }
  });

  it('should throw InvalidDateError for an invalid timestamp', () => {
    const invalidTimestamp = 'invalid-timestamp';
    const formatter = new DateFormatter();

    expect(() => {
      formatter.format(invalidTimestamp as unknown as number);
    }).toThrow(InvalidDateError);

    try {
      formatter.format(invalidTimestamp as unknown as number);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidDateError);
      expect(error.message).toBe(`The provided date "${invalidTimestamp}" is invalid.`);
    }
  });

  it('should throw InvalidDateError with Default values', () => {
    const invalidTimestamp = 'invalid-timestamp';
    const formatter = new DateFormatter();

    expect(() => {
      formatter.format(invalidTimestamp as unknown as number);
    }).toThrow(InvalidDateError);

    try {
      formatter.format(invalidTimestamp as unknown as number);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalidDateError);
      expect(error.message).toBe(`The provided date "${invalidTimestamp}" is invalid.`);
      expect(error.module).toBe(`DateFormatter`);
      expect(error.name).toBe(`InvalidDateError`);
    }
  });

  it('should use custom locale and options if provided', () => {
    const date = new Date('2024-09-15T00:00:00Z');
    const formatter = new DateFormatter('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    const result = formatter.format(date);

    expect(result).toEqual({
      miliseconds: date.getTime(),
      formatted: '15 septembre 2024'
    });
  });

  it('should use default locale and options if none provided', () => {
    const date = new Date('2024-09-15T00:00:00Z');
    const formatter = new DateFormatter();

    const result = formatter.format(date);

    expect(result).toEqual({
      miliseconds: date.getTime(),
      formatted: '15 de septiembre de 2024'
    });
  });

});
