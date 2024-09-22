import BaseCustomError from "../../BaseCustomError";

export class InvalidDateError extends BaseCustomError {
  constructor(errorConfig: Partial<BaseCustomError>) {
    super({
      value: errorConfig.value,
      module: errorConfig.module || "DateFormatter",
      message: errorConfig.message || `The provided date "${errorConfig.value}" is invalid.`,
      name: errorConfig.name || 'InvalidDateError',
      context: errorConfig.context,
    });
  }
}

export class DateFormatter {
  private readonly locale: string;
  private readonly options: Intl.DateTimeFormatOptions;



  constructor(locale: string = 'es-MX', options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },) {
    this.locale = locale;
    this.options = { ...options, timeZone: 'UTC' };
  }

  format(date: Date | number, errorConfig?: Omit<CustomErrorContext, 'value'>): formattedDate {
    if (typeof date === 'number') {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new InvalidDateError({ ...errorConfig, value: date });
    }
    return { miliseconds: date.getTime(), formatted: date.toLocaleDateString(this.locale, this.options) };
  }
}