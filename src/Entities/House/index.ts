import BaseCustomError from "../../Shared/valueObjects/BaseCustomError";
import { Id, PositiveNumber } from "../../Shared/valueObjects/primitives";
import Rent from "./Rent";
import Contract from "./valueObjects/Contract";
import Person from "./valueObjects/Person";

export class HouseError extends BaseCustomError {
  constructor(errorContext: CustomErrorContext) {
    super({
      message: errorContext.message,
      module: errorContext.module,
      value: errorContext.value,
      name: errorContext.name,
      context: errorContext.context,
    });
    Object.setPrototypeOf(this, HouseError.prototype);
  }
}

/**
 * Represents a house with an ID, address, size, owner, value, and rental status.
 */
export default class House {
  private readonly _moduleName = 'House'
  /**
   * The unique identifier for the house.
   * @private
   */
  private _id: Id;

  /**
   * The predial number.
   * @private
   */
  private _propertyTaxAccount: number;

  /**
   * The owner of the house.
   * @private
   */
  private _owner: Person;

  /**
   * The rental details of the house, if it is currently rented.
   * @private
   */
  private _rental: Rent | null;

  /**
   * The rental details of the house, if it is currently rented.
   * @public
   */
  public alias: string;

  /**
   * Creates an instance of House.
   * @param id - The unique identifier for the house.
   * @param owner - The Person owner of the house.
   * @param propertyTaxAccount - the legal identifier.
   * @param alias - the nickname of the house.
   * @param rent - The rent of the house.
   * @throws Error if size or value is less than or equal to zero.
   */
  constructor(
    id: string,
    owner: Person,
    propertyTaxAccount: StringOrNumber,
    alias: string,
    rent?: Rent
  ) {
    this._id = new Id(id, {
      module: this._moduleName,
    });

    this._propertyTaxAccount = new PositiveNumber(propertyTaxAccount, {
      module: this._moduleName,
      message: 'property tax account should be a pisitive number',
      name: "HouseTaxAccountTypeError"
    }).value

    this._owner = owner;
    this._rental = rent || null;
    this.alias = alias;
  }

  private getBaseErrorMessage() {
    return `The house ${this.alias} with property tax account ${this._propertyTaxAccount} and Id ${this._id}`
  }

  /**
   * Puts the house up for rent with the specified monthly price and deposit.
   * @param monthlyPrice - The monthly rental price.
   * @param deposit - The deposit amount.
   * @throws Error if the house is already rented.
   */
  public putForRent(newRent: Rent): void {
    if (this._rental !== null) {
      throw new HouseError({
        module: this._moduleName,
        message: `${this.getBaseErrorMessage()} is rent`,
        name: "HouseInRentError"
      });
    }

    this._rental = newRent;
  }

  /**
   * Block House for new rentals.
   * @throws Error if the house is not currently rented.
   */
  public removeFromRent(): void {
    if (this._rental === null) {
      throw new HouseError({
        module: this._moduleName,
        message: `${this.getBaseErrorMessage()} is not in rent`,
        name: "HouseNotInRentError"
      });
    }

    this._rental = null;
  }

  /**
   * Rents the house to a tenant for a specified period.
   * @param tenant [Person]- The name of the tenant.
   * @param startDate [formatDate]- The start date of the rental period.
   * @throws Error if the house is not available for rent.
   */
  public rentHouse(tenant: Person, startDateinMiliseconds: number): void {
    if (this._rental === null) {
      throw new HouseError({
        module: this._moduleName,
        message: `${this.getBaseErrorMessage()} is not available for rent`,
        name: "HouseRentError"
      });
    }

    const contract = new Contract(startDateinMiliseconds, 'House - rentHouse')

    this._rental.rentHouse(tenant, contract);
  }

  /**
   * Releases the house from its rental status.
   * @throws Error if the house is not currently rented.
   */
  public releaseHouse(): void {
    if (this._rental === null) {
      throw new HouseError({
        module: this._moduleName,
        message: `The house ${this.alias} with property tax account ${this._propertyTaxAccount} and Id ${this._id} is not in rent`,
        name: "HouseRentError"
      });
    }

    this._rental.releaseHouse();
  }

  /**
   * Gets the rental details of the house.
   * @returns The rental details of the house, or null if it is not rented.
   */
  public get rental(): Rent | null {
    return this._rental;
  }

}
