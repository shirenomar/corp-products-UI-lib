import { DateTime, DateTimeMaybeValid, DateTimeOptions, LocaleOptions } from 'luxon';
import { DateFormats, TimeFormats } from '../enums/date-formatter';

export class DateHandler {
  /**
   * @param date `ISO string`
   * @param format `format string`
   * @param localeOptions `opts to override the configuration options on this DateTime` - default is system's locale
   * @param isConvertedToUTC
   * @description Returns a string representation of this DateTime formatted according to the specified format string.
   */
  static formatDate(
    date: string,
    format: DateFormats = DateFormats.DATE_TIME_FULL,
    localeOptions?: LocaleOptions,
    isConvertedToUTC?: boolean
  ): string {
    if (!date) {
      return '';
    }
    return this.getDateTimeFromISO(date, isConvertedToUTC ? { zone: 'utc' } : {})
      ?.toFormat(format, localeOptions)
      .toLocaleString();
  }

  static getDateTimeFromISO(
    date: string,
    dateTimeOptions: DateTimeOptions = {}
  ): DateTime<true> | DateTime<false> {
    return DateTime.fromISO(date, dateTimeOptions);
  }

  static getJSDateFromISO(date: string): Date {
    const dateTime = this.getDateTimeFromISO(date, { zone: 'utc' }); // Ensure it's in UTC
    if (!dateTime.isValid) {
      throw new Error('Invalid date format');
    }
    return new Date(
      dateTime.year,
      dateTime.month - 1,
      dateTime.day,
      dateTime.hour,
      dateTime.minute,
      dateTime.second,
      dateTime.millisecond
    );
  }

  private static readonly FLEXIBLE_DATE_FORMATS: string[] = [
    DateFormats.DATE_DMY,
    'd/M/yyyy',
    'dd-MM-yyyy',
    'd-M-yyyy',
    'dd.MM.yyyy',
    'd.M.yyyy',
    'ddMMyyyy',
    'dd/MM/yy',
  ];

  static parseFlexibleDate(input: string): Date | null {
    const normalized = (input ?? '')
      .trim()

    if (!normalized) {
      return null;
    }

    for (const format of this.FLEXIBLE_DATE_FORMATS) {
      const parsed = DateTime.fromFormat(normalized, format);
      if (parsed.isValid) {
        return parsed.toJSDate();
      }
    }

    return null;
  }

  static getUTCDateTime(date: string): string {
    return this.getDateTimeFromISO(date)?.toUTC()?.toISO() as string;
  }

  static getUTCDateTimeFromJsDate(date: Date): string {
    return this.getDateFromJsDate(new Date(date))?.toUTC()?.toISO() as string;
  }

  static getCurrentUTCDateTime(): string {
    return DateTime.utc().toISO();
  }

  static getDateFromJsDate(date: Date): DateTimeMaybeValid {
    return DateTime.fromJSDate(date);
  }

  static checkIfTwoDatesEqual(startDate: Date, endDate: Date): boolean {
    return DateTime.fromJSDate(startDate).equals(DateTime.fromJSDate(endDate));
  }

  static getCurrentDateTime() {
    return DateTime;
  }

  static constructDateTime(date: Date, time: Date, isConvertedToUTC?: boolean) {
    const dateYear = this.getPartialDateOrTime(date, DateFormats.YEAR);
    const dateMonth = this.getPartialDateOrTime(date, DateFormats.MONTH);
    const dateDay = this.getPartialDateOrTime(date, DateFormats.DAY);

    const dateHours = this.getPartialDateOrTime(time, TimeFormats.HOURS24Format, isConvertedToUTC);
    const dateMinutes = this.getPartialDateOrTime(time, TimeFormats.MINUTES, isConvertedToUTC);
    const dateSeconds = this.getPartialDateOrTime(time, TimeFormats.SECONDS, isConvertedToUTC);

    return DateTime.utc(+dateYear, +dateMonth, +dateDay, +dateHours, +dateMinutes, +dateSeconds)
      .toUTC()
      .toISO();
  }

  static getPartialDateOrTime(
    date: Date,
    format: TimeFormats | DateFormats,
    isConvertedToUTC?: boolean
  ) {
    return DateTime.fromJSDate(date, isConvertedToUTC ? { zone: 'utc' } : {}).toFormat(format);
  }

  static getValueFromJSDate(date: Date, unit: 'year' | 'month' | 'day'): number {
    const dt = DateTime.fromJSDate(date);
    switch (unit) {
      case 'year':
        return dt.year;
      case 'month':
        return dt.month;
      case 'day':
        return dt.day;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }

  static getValueFromLocalDateTime(unit: 'hour' | 'minute' | 'second'): number {
    const now = DateTime.local();
    switch (unit) {
      case 'hour':
        return now.hour;
      case 'minute':
        return now.minute;
      case 'second':
        return now.second;
      default:
        throw new Error(`Unsupported unit: ${unit}`);
    }
  }

  static getISODateTime(date: Date): string {
    if (!date) {
      throw new Error('Invalid date: date is null or undefined');
    }

    // Create a DateTime instance from the JS Date, preserving the date parts
    // but using local time for the time parts
    const dt = DateTime.local().set({
      year: DateTime.fromJSDate(date).year,
      month: DateTime.fromJSDate(date).month,
      day: DateTime.fromJSDate(date).day,
      hour: DateTime.local().hour,
      minute: DateTime.local().minute,
      second: DateTime.local().second,
      millisecond: DateTime.local().millisecond,
    });

    return dt.toISO() as string;
  }
}
