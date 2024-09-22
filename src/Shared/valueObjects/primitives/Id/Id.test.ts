import Id, { InvalIdIdError } from './index';
import { v4 as uuidv4 } from 'uuid';

// Mock de uuid para controlarlo en las pruebas
jest.mock('uuid', () => ({
  v4: jest.fn(() => '123e4567-e89b-12d3-a456-426614174000'), // UUID mock válido
}));

describe('Id Value Object', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  it('should create a new Id when no value is provided', () => {
    const id = new Id();

    expect(uuidv4).toHaveBeenCalled(); // Verifica que se llamó a la función uuidv4
    expect(id.value).toBe('123e4567-e89b-12d3-a456-426614174000'); // Verifica que el ID es el mock
  });

  it('should create an Id with a valid provided value', () => {
    const validUUID = 'd9428888-122b-11e1-b85c-61cd3cbb3210';
    const id = new Id(validUUID);

    expect(uuidv4).not.toHaveBeenCalled(); // No debería llamarse uuidv4
    expect(id.value).toBe(validUUID); // El valor del ID debe ser el que se proporcionó
  });

  it('should throw InvalidIdError if provided value is not a valid UUID', () => {
    const invalidUUID = 'invalid-uuid';

    expect(() => {
      new Id(invalidUUID, {});
    }).toThrow(InvalIdIdError);

    try {
      new Id(invalidUUID, { context: 'Testing invalid UUID' });
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalIdIdError);
      expect(error.message).toBe('The provided value "invalid-uuid" is not a valid uuid.');
      expect(error.module).toBe('Id');
      expect(error.value).toBe(invalidUUID);
      expect(error.context).toBe('Testing invalid UUID');
    }
  });

  it('should use the default error message for invalid UUID', () => {
    const invalidUUID = 'invalid-uuid';

    try {
      new Id(invalidUUID);
    } catch (error: any) {
      expect(error).toBeInstanceOf(InvalIdIdError);
      expect(error.message).toBe(`The provided value "invalid-uuid" is not a valid uuid.`);
    }
  });

  it('should validate UUID correctly with static isValidId method', () => {
    const validUUID = 'd9428888-122b-11e1-b85c-61cd3cbb3210';
    const invalidUUID = 'invalid-uuid';

    expect(Id['isValidId'](validUUID)).toBe(true); // Método privado, llamado con indexado
    expect(Id['isValidId'](invalidUUID)).toBe(false);
  });
});
