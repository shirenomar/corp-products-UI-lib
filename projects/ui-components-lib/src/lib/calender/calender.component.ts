import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbCalendarIslamicUmalqura, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment-hijri';
import { HijriCalendarComponent } from './hijri-calendar/hijri-calendar.component';
import { GregorianCalendarComponent } from './gregorian-calendar/gregorian-calendar.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePickerSwitcherComponent } from './date-picker-switcher/date-picker-switcher.component';
import '@angular/localize/init';
import { getGregorianMonthName, getHijriMonthName } from './utils/date-i18n.utils';
@Component({
  selector: 'app-calender',
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      transition('closed <=> open', [
        animate('300ms ease')
      ])
    ])
  ],
  imports: [
    NgbDatepickerModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    HijriCalendarComponent,
    DatePickerSwitcherComponent,
    GregorianCalendarComponent
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura }
  ],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CalenderComponent {
  selectedDate = ''
  @Input() control: FormControl<any> = new FormControl({ value: null, disabled: false }, []);
  mode: 'gregorian' | 'hijri' = 'gregorian';
  gregorianModel!: NgbDateStruct;
  hijriModel!: NgbDateStruct;
  currentLang: 'ar' | 'en' = 'ar';
  @Output() selectButtonChange = new EventEmitter<{ name: string; value: any }>();
  isCalendarOpen = false
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  constructor() { }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.calendarContainer) return;

    const clickedInside = this.calendarContainer.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isCalendarOpen = false;
    }
  }
  onSelectGregorian(date: NgbDateStruct) {
    this.gregorianModel = date;
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D');
    this.hijriModel = {
      year: +m.format('iYYYY'),
      month: +m.format('iM'),
      day: +m.format('iD')
    };
    this.selectedDate = this.formatHijri(m);
    this.isCalendarOpen = false;
  }

  onSelectHijri(date: NgbDateStruct) {
    this.hijriModel = date;
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'iYYYY-iM-iD');
    this.gregorianModel = {
      year: +m.format('YYYY'),
      month: +m.format('M'),
      day: +m.format('D')
    };
    this.selectedDate = this.formatHijri(m);
    this.isCalendarOpen = false;
  }
  showCalender(isOpen: boolean) {
    this.isCalendarOpen = isOpen;
  }
  formatHijri(m: moment.Moment): string {
    const hijriDay = m.format('iD');
    const hijriMonth = getHijriMonthName(this.currentLang, +m.format('iM'));
    const gregorianDay = m.format('D');
    const gregorianMonth = getGregorianMonthName(this.currentLang, +m.format('M'));
    const gregorianYear = m.format('YYYY');
    const hijriYear = m.format('iYYYY');
    return `${gregorianDay} ${gregorianMonth} ${gregorianYear} - ${hijriDay} ${hijriMonth} ${hijriYear}`;
  }


}
