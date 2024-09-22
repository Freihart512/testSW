import TaxRegime from ".";
import { OutOfRangeTaxRegimeError } from ".";
import { InvalidPositiveNumberError } from "../../../../Shared/valueObjects/primitives/PositiveNumber";

describe('TaxRegime Value Object', () => {

  it('should create a valid TaxRegime when the value is within the valid range (600 - 700)', () => {
    const validTaxRegime = new TaxRegime(650, 'ValidContext');
    expect(validTaxRegime.value).toBe(650);
  });

  it('should throw InvalidPositiveNumberError if the value is not a number', () => {
    expect(() => {
      new TaxRegime('invalid', 'InvalidNumberContext');
    }).toThrow(InvalidPositiveNumberError);
  });

  it('should throw InvalidPositiveNumberError if the value is a negative number', () => {
    expect(() => {
      new TaxRegime(-650, 'NegativeNumberContext');
    }).toThrow(InvalidPositiveNumberError);
  });

  it('should throw OutOfRangeTaxRegimeError if the value is below 600', () => {
    expect(() => {
      new TaxRegime(599, 'BelowRangeContext');
    }).toThrow(OutOfRangeTaxRegimeError);
  });

  it('should throw OutOfRangeTaxRegimeError if the value is above 700', () => {
    expect(() => {
      new TaxRegime(701, 'AboveRangeContext');
    }).toThrow(OutOfRangeTaxRegimeError);
  });

  it('should throw OutOfRangeTaxRegimeError with correct error details when the value is out of range', () => {
    try {
      new TaxRegime(701, 'ErrorContext');
    } catch (err: any) {
      expect(err).toBeInstanceOf(OutOfRangeTaxRegimeError);
      expect(err.message).toBe('taxRegime "701" shpuld be between 600 and 700.');
      expect(err.context).toBe('ErrorContext');
      expect(err.module).toBe('taxRegime');
    }
  });

});
