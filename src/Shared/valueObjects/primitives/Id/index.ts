import { v4 as uuidv4 } from 'uuid';
import BaseCustomError from '../../BaseCustomError';

export class InvalIdIdError extends BaseCustomError {
  constructor(errorContext: CustomErrorContext) {
    super({
      message: errorContext.message || `The provided value "${errorContext.value}" is not a valid uuid.`,
      module: errorContext.module || 'Id',
      value: errorContext.value,
      name: errorContext.name || 'InvalidIdError',
      context: errorContext.context,
    });
    Object.setPrototypeOf(this, InvalIdIdError.prototype);
  }
}


/**
 * Represents a UUID (Universally Unique Identifier) value object.
 * Ensures that the provided value is a valid UUID.
 */
export default class Id {
  /**
   * The UUID value.
   * @private
   */
  private readonly _value: string;

  /**
   * Creates an instance of UUID.
   * @param value - The UUID value as a string. If not provided, generates a new UUID.
   * @throws Error if the provided value is not a valid UUID.
   */
  constructor(value?: string, errorContext?: Pick<CustomErrorContext, 'module' | 'context'>) {
    if (value) {
      if (!Id.isValidId(value)) {
        throw new InvalIdIdError({ value, ...(errorContext || {}) });
      }
      this._value = value;
    } else {
      this._value = uuidv4(); // Generate a new UUID if no value is provided
    }
  }

  /**
   * Gets the raw UUID value.
   * @returns The UUID value.
   */
  public get value(): string {
    return this._value;
  }

  /**
   * Validates if a given string is a valid UUID.
   * @param value - The string value to validate.
   * @returns True if the value is a valid UUID, false otherwise.
   */
  private static isValidId(value: string): boolean {
    // Regular expression to validate UUID v4
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(value);
  }
}