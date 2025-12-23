import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbCalendarIslamicUmalqura, NgbDatepickerModule, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HijriCalendarComponent } from './hijri-calendar/hijri-calendar.component';
import { GregorianCalendarComponent } from './gregorian-calendar/gregorian-calendar.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePickerSwitcherComponent } from './date-picker-switcher/date-picker-switcher.component';
import '@angular/localize/init';
import { getGregorianMonthName, getHijriMonthName } from './utils/date-i18n.utils';
@Component({
  selector: 'app-dual-calendar',
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
  templateUrl: './dual-calendar.component.html',
  styleUrl: './dual-calendar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DualCalendarComponent {
  selectedDate = ''
  @Input() control: FormControl<any> = new FormControl({ value: null, disabled: false }, []);
  @Input() label = '';
  @Input() withTime = true;
  mode: 'gregorian' | 'hijri' = 'gregorian';
  gregorianModel!: NgbDateStruct;
  hijriModel!: NgbDateStruct;
  currentLang: 'ar' | 'en' = 'ar';
  @Output() gregorianUTC = new EventEmitter<string>();
  isCalendarOpen = false
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  hijriCal = new NgbCalendarIslamicUmalqura();
  constructor() { }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.calendarContainer) return;
    const clickedInside = this.calendarContainer.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isCalendarOpen = false;
    }
  }
  private structToNgbDate(d: NgbDateStruct): NgbDate {
    return new NgbDate(d.year, d.month, d.day);
  }

  onSelectGregorian(date: NgbDateStruct) {
    this.gregorianModel = date;
    // Convert to NgbDate
    const jsDate = new Date(date.year, date.month - 1, date.day);
    // fromGregorian expects NgbDate or JS Date (depending on version)
    const hijri = this.hijriCal.fromGregorian(jsDate);
    const isoUTC = jsDate.toISOString();
    this.gregorianUTC.emit(this.withTime? isoUTC : this.getDateOnlyFormat(date));
    this.hijriModel = {
      year: hijri.year,
      month: hijri.month,
      day: hijri.day
    }; // datepicker

    this.selectedDate = this.formatHijri(this.structToNgbDate(this.hijriModel)); //input
    this.isCalendarOpen = false;
  }

  onSelectHijri(date: NgbDateStruct) {
    this.hijriModel = date;
    const ngbDate = this.structToNgbDate(date);
    const greg = this.hijriCal.toGregorian(ngbDate);
    const isoUTC = greg.toISOString();
    this.gregorianModel = {
      year: greg.getFullYear(),
      month: greg.getMonth() + 1,
      day: greg.getDate()
    };
    this.gregorianUTC.emit(this.withTime? isoUTC : this.getDateOnlyFormat(this.gregorianModel));
    this.selectedDate = this.formatHijri(ngbDate);
    this.isCalendarOpen = false;
  }

  showCalender(isOpen: boolean) {
    this.isCalendarOpen = isOpen;
  }
  formatHijri(h: NgbDate): string {
    const hijriDay = h.day;
    const hijriMonth = getHijriMonthName(this.currentLang, h.month);
    const hijriYear = h.year;
    const greg = this.hijriCal.toGregorian(h);
    const gregorianDay = greg.getDate();
    const gregorianMonth =
      getGregorianMonthName(this.currentLang, greg.getMonth() + 1);
    const gregorianYear = greg.getFullYear();
    return `${gregorianDay} ${gregorianMonth} ${gregorianYear} - ${hijriDay} ${hijriMonth} ${hijriYear}`;
  }

  getDateOnlyFormat(date: NgbDateStruct) {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }

}
