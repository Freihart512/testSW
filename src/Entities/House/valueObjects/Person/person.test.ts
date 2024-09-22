import Person from "../Person";
import { EmptyStringError } from "../../../../Shared/valueObjects/primitives/NoEmptyString";
import { InvalidPositiveNumberError } from "../../../../Shared/valueObjects/primitives/PositiveNumber";
import { InvalidRfcError } from "../Rfc";
import { OutOfRangeTaxRegimeError } from "../TaxRegime";

describe('Person', () => {
  const validConfig = {
    fiscalName: "John Doe",
    rfc: "cacx7605101p8",
    postalCode: 12345,
    taxRegime: 600
  };

  const invalidConfig = {
    fiscalName: "",
    rfc: "INVALIDRFC",
    postalCode: -123,
    taxRegime: 999
  };

  it('should create a valid Person instance', () => {
    const person = new Person(validConfig);
    expect(person.name).toBe('Persona Generica');
    expect(person.fiscalName.value).toBe('John Doe');
    expect(person.rfc.value).toBe('CACX7605101P8');
    expect(person.postalCode.value).toBe(12345);
    expect(person.taxRegime.value).toBe(600);
  });

  it('should throw error for empty fiscal name', () => {
    expect(() => new Person({ ...validConfig, fiscalName: '' })).toThrow(EmptyStringError);
  });

  it('should throw InvalidRfcError for invalid RFC', () => {
    expect(() => new Person({ ...validConfig, rfc: 'INVALIDRFC' })).toThrow(InvalidRfcError);
  });

  it('should throw error for negative postal code', () => {
    expect(() => new Person({ ...validConfig, postalCode: -123 })).toThrow(InvalidPositiveNumberError);
  });

  it('should throw OutOfRangeTaxRegimeError for out of range tax regime', () => {
    expect(() => new Person({ ...validConfig, taxRegime: 999 })).toThrow(OutOfRangeTaxRegimeError);
  });
});