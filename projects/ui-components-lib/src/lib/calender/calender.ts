import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbCalendarGregorian, NgbCalendarIslamicUmalqura, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment-hijri';
import '@angular/localize/init';

import {
  NgbCalendarIslamicCivil,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { HijriCalendarComponent } from './hijri-calendar/hijri-calendar.component';
import { GregorianCalendarComponent } from './gregorian-calendar/gregorian-calendar.component';

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

@Component({
  selector: 'lib-calender',
  imports: [
    NgbDatepickerModule,
    FormsModule,
    HijriCalendarComponent,
    GregorianCalendarComponent
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura }
  ],
  templateUrl: './calender.html',
  styleUrl: './calender.css'
})
export class Calender {
mode: 'gregorian' | 'hijri' = 'gregorian';
  gregorianModel!: NgbDateStruct;
  hijriModel!: NgbDateStruct;

  constructor() {
    const today = new Date();
    this.gregorianModel = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    // Convert to Hijri
    const m = moment(today);
    this.hijriModel = {
      year: +m.format('iYYYY'),
      month: +m.format('iM'),
      day: +m.format('iD')
    };
  }

  onSelectGregorian(date: NgbDateStruct) {
    this.gregorianModel = date;
    console.log('Gregorian selected:', date);

    // Convert Gregorian to Hijri
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D');
    this.hijriModel = {
      year: +m.format('iYYYY'),
      month: +m.format('iM'),
      day: +m.format('iD')
    };
    console.log('Converted to Hijri:', this.hijriModel);
  }

  onSelectHijri(date: NgbDateStruct) {
    this.hijriModel = date;
    console.log('Hijri selected:', date);

    // Convert Hijri to Gregorian
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'iYYYY-iM-iD');
    this.gregorianModel = {
      year: +m.format('YYYY'),
      month: +m.format('M'),
      day: +m.format('D')
    };
    console.log('Converted to Gregorian:', this.gregorianModel);
  }
}
