import { rfcValido } from '.'; // Asegúrate de que la ruta del archivo sea correcta

describe('rfcValido', () => {

  it('should return the RFC when a valid RFC for individuals is provided', () => {
    const rfc = 'GODE561231GR8';
    const result = rfcValido(rfc);
    expect(result).toBe(rfc);
  });

  it('should return the RFC when a valid RFC for moral persons is provided', () => {
    const rfc = 'EKU9003173C9';
    const result = rfcValido(rfc);
    expect(result).toBe(rfc);
  });

  it('should return false when an RFC has an invalid format', () => {
    const rfc = 'INVALIDRFC';
    const result = rfcValido(rfc);
    expect(result).toBe(false);
  });

  it('should return false when the checksum digit is incorrect', () => {
    const rfc = 'GODE561231GR9'; // Incorrect checksum digit
    const result = rfcValido(rfc);
    expect(result).toBe(false);
  });

  it('should return the RFC when a valid generic RFC is provided and aceptarGenerico is true', () => {
    const rfcGenerico = 'XAXX010101000';
    const result = rfcValido(rfcGenerico);
    expect(result).toBe(rfcGenerico);
  });

  it('should return false when a generic RFC is provided and aceptarGenerico is false', () => {
    const rfcGenerico = 'XAXX010101000';
    const result = rfcValido(rfcGenerico, false);
    expect(result).toBe(false);
  });

  it('should return false when a foreigner generic RFC is provided and aceptarGenerico is false', () => {
    const rfcExtranjero = 'XEXX010101000';
    const result = rfcValido(rfcExtranjero, false);
    expect(result).toBe(false);
  });

  it('should return the RFC when a foreigner generic RFC is provided and aceptarGenerico is true', () => {
    const rfcExtranjero = 'XEXX010101000';
    const result = rfcValido(rfcExtranjero, true);
    expect(result).toBe(rfcExtranjero);
  });

  it('should return false when RFC has incorrect length', () => {
    const rfcShort = 'GODE561231GR';
    const rfcLong = 'GODE561231GR88';
    expect(rfcValido(rfcShort)).toBe(false);
    expect(rfcValido(rfcLong)).toBe(false);
  });
});
