import Rfc, { InvalidRfcError } from '.'


describe('Rfc', () => {
  const errorContext = 'TestContext';

  it('should create an Rfc instance when RFC is valid', () => {
    const validRfc = 'XAXX010101000';
    const rfc = new Rfc(validRfc, errorContext);

    expect(rfc.value).toBe(validRfc);
  });

  it('should throw InvalidRfcError when RFC is invalid', () => {
    const invalidRfc = 'INVALIDRFC';

    expect(() => {
      new Rfc(invalidRfc, errorContext);
    }).toThrow(InvalidRfcError);
  });

  it('should pass the RFC and errorContext to InvalidRfcError', () => {
    const invalidRfc = 'INVALIDRFC';
    try {
      new Rfc(invalidRfc, errorContext);
    } catch (error) {
      if (error instanceof InvalidRfcError) {
        expect(error.message).toBe(`RFC "${invalidRfc}" is invalid.`);
        expect(error.context).toBe(errorContext);
        expect(error.value).toBe(invalidRfc);
      } else {
        throw error;
      }
    }
  });
});
