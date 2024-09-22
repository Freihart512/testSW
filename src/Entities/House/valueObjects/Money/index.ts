import { NoEmptyString, PositiveNumber } from "../../../../Shared/valueObjects/primitives";

/**
 * Represents a monetary value with an amount and a currency.
 * Provides methods to access the raw amount and a formatted string representation of the amount.
 */
export default class Money {
  private readonly amount: number;
  private readonly currency: string;

  /**
   * Creates a new instance of Money.
   * 
   * @param amount - The monetary amount. Must be a positive number.
   * @param currency [currency=MXN] - The currency code (e.g., 'USD', 'EUR'). Must not be empty.
   * @param errorContext - Optional context for error messages.
   * 
   * @throws {InvalidPositiveNumberError} - If the amount is not a positive number.
   * @throws {EmptyStringError} - If the currency is an empty string.
   */
  constructor(amount: StringOrNumber, currency: string = 'MXN', errorContext?: string) {
    this.amount = new PositiveNumber(amount, {
      message: 'Amount must be a positive number.',
      module: "Money",
      name: "InvalidAmountTypeError",
      context: errorContext
    }).value;

    this.currency = new NoEmptyString(currency, {
      message: 'Currency cannot be empty.',
      module: "Money",
      name: "EmptyCurrencyError",
      context: errorContext
    }).value;
  }

  /**
   * Gets the value of money.
   * 
   * @param locale [locale=es-MX] - The locale to use for formatting (e.g., 'es-MX' for Mexican Spanish). Defaults to 'es-MX'.
   * @returns The formatted money [MoneyValue].
   */
  getValue(locale: string = 'es-MX'): MoneyValue {

    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency,
    });

    return { amountRaw: this.amount, formatted: formatter.format(this.amount) };

  }
}