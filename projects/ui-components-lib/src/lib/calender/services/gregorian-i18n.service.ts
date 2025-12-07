import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const WEEKDAYS_AR = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const WEEKDAYS_EN = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

@Injectable()
export class GregorianArabicI18n extends NgbDatepickerI18n {
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
export class GregorianEnglishI18n extends NgbDatepickerI18n {
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

// ============ Dynamic I18N Factory ============

@Injectable()
export class DynamicGregorianI18n extends NgbDatepickerI18n {
  private currentLang: 'ar' | 'en' = 'en';
  private arabicI18n = new GregorianArabicI18n();
  private englishI18n = new GregorianEnglishI18n();

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
