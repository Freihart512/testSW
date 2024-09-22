import Contract, {
  InvalidContractStartDateError,
  InvalidContractEndDateError
} from '.';

describe('Contract', () => {
  const VALID_START_DATE = 1609459200000; // 01-01-2021 in milliseconds
  const ERROR_CONTEXT = 'Test Context';

  describe('constructor', () => {
    it('should create a Contract with valid start date', () => {
      const contract = new Contract(VALID_START_DATE, ERROR_CONTEXT);
      const period = contract.getPeriod();

      expect(period.startDate.formatted).toBe("1 de enero de 2021");
      expect(period.endDate.formatted).toBe("1 de enero de 2022");
    });

    it('should throw InvalidContractStartDateError if start date is too early', () => {
      const EARLY_START_DATE = 1500000000000; // Invalid date before 01-01-2020
      expect(() => new Contract(EARLY_START_DATE, ERROR_CONTEXT)).toThrow(InvalidContractStartDateError);
    });

    it('should throw InvalidContractEndDateError if end date exceeds max allowed date', () => {
      const LATE_START_DATE = 4092466400000; // Date that would cause end date to exceed 01-01-2100
      expect(() => new Contract(LATE_START_DATE, ERROR_CONTEXT)).toThrow(InvalidContractEndDateError);
    });
  });

  describe('validateStartDate', () => {
    it('should throw InvalidContractStartDateError for invalid start date', () => {
      const INVALID_START_DATE = 1577750000000; // Date before 01-01-2020
      expect(() => new Contract(INVALID_START_DATE, ERROR_CONTEXT)).toThrow(InvalidContractStartDateError);
    });
  });

  describe('validateEndDate', () => {
    it('should throw InvalidContractEndDateError for invalid end date', () => {
      const VALID_BUT_LATE_START_DATE = 4092466400000; // Start date that leads to end date beyond 01-01-2100

      expect(() => new Contract(VALID_BUT_LATE_START_DATE, ERROR_CONTEXT)).toThrow(InvalidContractEndDateError);
    });
  });
});
