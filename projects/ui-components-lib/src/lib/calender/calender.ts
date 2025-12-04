import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbCalendarIslamicUmalqura, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment-hijri';
import '@angular/localize/init';
import { HijriCalendarComponent } from './hijri-calendar/hijri-calendar.component';
import { GregorianCalendarComponent } from './gregorian-calendar/gregorian-calendar.component';


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
  styleUrl: './calender.scss'
})
export class Calender {
  mode: 'gregorian' | 'hijri' = 'gregorian';
  gregorianModel!: NgbDateStruct;
  hijriModel!: NgbDateStruct;
  currentLang: 'ar' | 'en' = 'ar';
  constructor() { }

  onSelectGregorian(date: NgbDateStruct) {
    this.gregorianModel = date;
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D');
    this.hijriModel = {
      year: +m.format('iYYYY'),
      month: +m.format('iM'),
      day: +m.format('iD')
    };
  }

  onSelectHijri(date: NgbDateStruct) {
    this.hijriModel = date;
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'iYYYY-iM-iD');
    this.gregorianModel = {
      year: +m.format('YYYY'),
      month: +m.format('M'),
      day: +m.format('D')
    };
  }
}
