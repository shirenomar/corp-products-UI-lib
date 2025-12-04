import { Injectable } from '@angular/core';
import { NgbCalendar,  NgbCalendarIslamicUmalqura,  NgbDatepickerI18n,  NgbDatepickerModule,  NgbDateStruct, } from '@ng-bootstrap/ng-bootstrap';
const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = [
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

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number): string {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number): string {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return WEEKDAYS[weekday - 1];
  }

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS[weekday - 1];
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
