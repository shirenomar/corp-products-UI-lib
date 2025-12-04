import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

// Arabic (Hijri) Configuration
const WEEKDAYS_AR = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS_AR = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة',
];

// English (Gregorian) Configuration
const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number): string {
    return MONTHS_AR[month - 1];
  }

  getMonthFullName(month: number): string {
    return MONTHS_AR[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return WEEKDAYS_AR[weekday - 1];
  }

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS_AR[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  override getYearNumerals(year: number): string {
    return String(year);
  }

  override getWeekNumerals(weekNumber: number): string {
    return String(weekNumber);
  }

  override getDayNumerals(date: NgbDateStruct): string {
    return String(date.day);
  }
}

@Injectable()
export class EnglishI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number): string {
    return MONTHS_EN[month - 1].substring(0, 3);
  }

  getMonthFullName(month: number): string {
    return MONTHS_EN[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return WEEKDAYS_EN[weekday - 1];
  }

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS_EN[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  override getYearNumerals(year: number): string {
    return String(year);
  }

  override getWeekNumerals(weekNumber: number): string {
    return String(weekNumber);
  }

  override getDayNumerals(date: NgbDateStruct): string {
    return String(date.day);
  }
}
