import BaseCustomError from "../../Shared/valueObjects/BaseCustomError";
import Contract from "./valueObjects/Contract";
import Money from "./valueObjects/Money";
import Person from "./valueObjects/Person";

class RentError extends BaseCustomError {
  constructor(errorContext: CustomErrorContext) {
    super({
      message: errorContext.message,
      module: errorContext.module,
      value: errorContext.value,
      name: errorContext.name,
      context: errorContext.context,
    });
    Object.setPrototypeOf(this, RentError.prototype);
  }
}

/**
 * Represents a rental agreement.
 */
export default class Rent {
  private readonly _moduleName = 'Rent'
  /**
   * Monthly rental price, represented as a Money object.
   * @private
   */
  private _monthPrice: Money;

  /**
   * Deposit amount, represented as a Money object.
   * @private
   */
  private _deposit: Money;

  /**
   * The current tenant, or null if no tenant is assigned.
   * @private
   */
  private _tenant: Person | null = null;

  /**
   * The current contract, or null if no contract is assigned.
   * @private
   */
  private _contract: Contract | null = null;

  /**
   * Creates an instance of Rent.
   * @param monthPrice - The monthly rental price (can be a number or a string convertible to a number).
   * @param deposit - The deposit amount (can be a number or a string convertible to a number).
   */
  constructor(monthPrice: StringOrNumber, deposit: StringOrNumber) {
    // Initialize the monthly price and deposit using the Money class.
    this._monthPrice = new Money(monthPrice, 'Creating Rent');
    this._deposit = new Money(deposit, 'Creating Rent');
  }

  /**
   * Assigns a tenant and contract to the rental.
   * @param tenant - The person who will rent the property.
   * @param contract - The rental contract associated with the agreement.
   */
  public rentHouse(tenant: Person, contract: Contract): void {
    this._tenant = tenant;
    this._contract = contract;
  }

  /**
   * Gets the monthly rental price as a formatted value.
   * @returns The monthly rental price.
   */
  public get monthPrice(): MoneyValue {
    return this._monthPrice.getValue();
  }

  /**
   * Gets the current tenant.
   * @returns The current tenant or null if no tenant is assigned.
   */
  public get tenant(): Person | null {
    return this._tenant;
  }

  /**
   * Retrieves a specific date from the contract.
   * @param dateType - Type of date to retrieve ('startDate' or 'endDate').
   * @returns The formatted date corresponding to the specified dateType, or null if no contract exists.
   * @private
   */
  private getDate(dateType: keyof contractValue): formattedDate | null {
    if (!this._contract) {
      return null; // If there is no contract, return null.
    }
    const period = this._contract.getPeriod();
    return period[dateType];
  }

  /**
   * Gets the start date of the contract.
   * @returns The start date of the contract or null if no contract exists.
   */
  public get startDate(): formattedDate | null {
    return this.getDate('startDate');
  }

  /**
   * Gets the end date of the contract.
   * @returns The end date of the contract or null if no contract exists.
   */
  public get endDate(): formattedDate | null {
    return this.getDate('endDate');
  }

  /**
   * Gets the deposit amount as a formatted value.
   * @returns The deposit amount.
   */
  public get deposit(): MoneyValue {
    return this._deposit.getValue();
  }

  /**
   * Gets the deposit amount as a formatted value.
   * @throws Error if the house is not currently in rent.
   */
  public releaseHouse(): void {
    if (!this._tenant || !this._contract) {
      throw new RentError({
        module: this._moduleName,
        message: `The house is not currently rented.`,
        name: "HouseNotInRentError",
      });
    }
    this._tenant = null;
    this._contract = null;
  }
}
