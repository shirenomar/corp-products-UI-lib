import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MONTHS_HIJRI, WEEKDAYS } from '../utils/date-i18n.utils';

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number): string {
    return MONTHS_HIJRI.ar[month - 1];
  }

  getMonthFullName(month: number): string {
    return MONTHS_HIJRI.ar[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return WEEKDAYS.ar[weekday - 1];
  }

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS.ar[weekday - 1];
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
export class HijriEnglishI18n extends NgbDatepickerI18n {
  getMonthShortName(month: number): string {
    return MONTHS_HIJRI.en[month - 1].substring(0, 3);
  }

  getMonthFullName(month: number): string {
    return MONTHS_HIJRI.en[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return WEEKDAYS.en[weekday - 1];
  }

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS.en[weekday - 1];
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
export class DynamicHijriI18n extends NgbDatepickerI18n {
  private currentLang: 'ar' | 'en' = 'ar';
  private arabicI18n = new IslamicI18n();
  private englishI18n = new HijriEnglishI18n();

  setLanguage(lang: 'ar' | 'en') {
    this.currentLang = lang;
  }

  private get activeI18n() {
    return this.currentLang === 'ar' ? this.arabicI18n : this.englishI18n;
  }

  getMonthShortName(month: number): string {
    return this.activeI18n.getMonthShortName(month);
  }

  getMonthFullName(month: number): string {
    return this.activeI18n.getMonthFullName(month);
  }

  getWeekdayLabel(weekday: number): string {
    return this.activeI18n.getWeekdayLabel(weekday);
  }

  getWeekdayShortName(weekday: number): string {
    return this.activeI18n.getWeekdayShortName(weekday);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return this.activeI18n.getDayAriaLabel(date);
  }

  override getYearNumerals(year: number): string {
    return this.activeI18n.getYearNumerals(year);
  }

  override getWeekNumerals(weekNumber: number): string {
    return this.activeI18n.getWeekNumerals(weekNumber);
  }

  override getDayNumerals(date: NgbDateStruct): string {
    return this.activeI18n.getDayNumerals(date);
  }
}
