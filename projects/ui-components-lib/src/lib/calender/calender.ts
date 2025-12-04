import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbCalendarIslamicUmalqura, NgbDatepickerModule, NgbDatepickerI18n, NgbCalendarGregorian } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment-hijri';
import '@angular/localize/init';
import { HijriCalendarComponent } from './hijri-calendar/hijri-calendar.component';
import { GregorianCalendarComponent } from './gregorian-calendar/gregorian-calendar.component';
import { EnglishI18n, IslamicI18n } from './islamic-i18n.service';


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
  get providers() {
    return this.mode === 'hijri'
      ? [
          { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
          { provide: NgbDatepickerI18n, useClass: IslamicI18n }
        ]
      : [
          { provide: NgbCalendar, useClass: NgbCalendarGregorian },
          { provide: NgbDatepickerI18n, useClass: EnglishI18n }
        ];
  }
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
