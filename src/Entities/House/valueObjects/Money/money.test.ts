import Money from '.';
// import { PositiveNumber, NoEmptyString } from "../../../../Shared/valueObjects/primitives"
import { InvalidPositiveNumberError } from '../../../../Shared/valueObjects/primitives/PositiveNumber';
import { EmptyStringError } from '../../../../Shared/valueObjects/primitives/NoEmptyString';

describe('Money Value Object', () => {

  describe('Constructor', () => {

    it('should create a Money instance with valid amount and default currency', () => {
      const money = new Money(100);
      expect(money).toBeDefined();
      expect(money.getValue()).toEqual({
        amountRaw: 100,
        formatted: '$100.00' // Default formatting for 'es-MX' locale and 'MXN' currency
      });
    });

    it('should create a Money instance with valid amount and specified currency', () => {
      const money = new Money(100, 'USD');
      expect(money.getValue('en-US')).toEqual({
        amountRaw: 100,
        formatted: '$100.00' // Default formatting for 'USD' currency and 'en-US' locale
      });
    });

    it('should throw InvalidPositiveNumberError if amount is negative', () => {
      expect(() => {
        new Money(-10);
      }).toThrow(InvalidPositiveNumberError);
    });

    it('should throw InvalidPositiveNumberError if amount is not a number', () => {
      expect(() => {
        new Money('invalid-amount');
      }).toThrow(InvalidPositiveNumberError);
    });

    it('should throw EmptyStringError if currency is an empty string', () => {
      expect(() => {
        new Money(100, '');
      }).toThrow(EmptyStringError);
    });

    it('should accept valid amount and currency with custom error context', () => {
      const money = new Money(200, 'EUR', 'CustomContext');
      expect(money.getValue('en-GB')).toEqual({
        amountRaw: 200,
        formatted: '€200.00' // 'EUR' currency and 'en-GB' locale
      });
    });
  });

  describe('getValue', () => {

    it('should return correctly formatted amount and currency for default locale', () => {
      const money = new Money(150);
      expect(money.getValue()).toEqual({
        amountRaw: 150,
        formatted: '$150.00'
      });
    });

    it('should return correctly formatted amount and currency for custom locale', () => {
      const money = new Money(300, 'USD');
      expect(money.getValue('en-US')).toEqual({
        amountRaw: 300,
        formatted: '$300.00'
      });
    });

  });
});
