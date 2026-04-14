import { Component, effect, ElementRef, EventEmitter, HostListener, inject, Input, OnChanges, OnInit, Output, Renderer2, signal, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { formatDate } from '@angular/common';
import { DateFormats } from '../../enums/date-formatter';
import { TranslatePipe } from '@ngx-translate/core';
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
    TranslatePipe,
    GregorianCalendarComponent
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura }
  ],
  templateUrl: './dual-calendar.component.html',
  styleUrl: './dual-calendar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DualCalendarComponent implements OnInit , OnChanges {
  @ViewChild('calendarWrapper') calendarWrapper!: ElementRef;
  selectedDate = ''
  @Input() control: FormControl<any> = new FormControl({ value: null, disabled: false }, []);
  @Input() label = '';
  @Input() name = '';
  @Input() withTime = true;
  @Input() isDatePickerShow = true;
  mode: 'gregorian' | 'hijri' = 'gregorian';
  gregorianModel!: NgbDateStruct;
  hijriModel!: NgbDateStruct;
  @Input() currentLang = signal<'ar' | 'en'>('ar');
  @Output() gregorianUTC = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<boolean>();

  gregorianUTCValue  = ''
  @Input() isShown =  false
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  hijriCal = new NgbCalendarIslamicUmalqura();
  renderer = inject(Renderer2);
  constructor() {
    effect(() => {
      this.currentLang(); // 👈 track signal
      this.setDate(this.gregorianUTCValue)
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isShown']?.currentValue) {
      this.moveElementToBody();
    }else {
      this.removeFromBody();
    }
  }
  ngOnInit() {
    this.setDate(this.control?.value);
  }


  ngAfterViewInit() {
    this.moveElementToBody();
  }

  moveElementToBody() { //this function same as appendTo="body"
    const el = this.calendarWrapper.nativeElement;
    const rect = el.getBoundingClientRect();

    this.renderer.appendChild(document.body, el);

    this.renderer.setStyle(el, 'position', 'absolute');

    this.renderer.setStyle(el, 'top', `${rect.top + window.scrollY}px`);
    this.renderer.setStyle(el, 'left', `${rect.left}px`);
    this.renderer.setStyle(el, 'width', `${rect.width}px`);
    this.renderer.setStyle(el, 'z-index', '9999');
    this.renderer.setStyle(el, 'visibility', 'visible');
  }

  removeFromBody() {
   const el = this.calendarWrapper?.nativeElement;
    if (el) {
      this.renderer.setStyle(el, 'visibility', 'hidden');
    }
  }

  setDate(value: string | null) {
    if (!value) return;

    const jsDate = new Date(value);
    if (isNaN(jsDate.getTime())) return;

    const ngbDate: NgbDateStruct = {
      year: jsDate.getFullYear(),
      month: jsDate.getMonth() + 1,
      day: jsDate.getDate()
    };

    // 🔥 Reuse existing logic
    this.onSelectGregorian(ngbDate);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    event.stopPropagation()
    if (!this.calendarContainer) return;
    const clickedInside = this.calendarContainer.nativeElement.contains(event.target);
    this.onClose.emit(!clickedInside)
    if (!clickedInside) {
      this.isShown = false;
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
     this.gregorianUTCValue = this.withTime ? isoUTC : formatDate(jsDate, DateFormats.DATE_ONLY, 'en');
    this.gregorianUTC.emit(this.gregorianUTCValue);
    this.hijriModel = {
      year: hijri.year,
      month: hijri.month,
      day: hijri.day
    }; // datepicker

    this.selectedDate = this.formatHijri(this.structToNgbDate(this.hijriModel)); //input
    this.isShown = false;
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
    const jsDate = new Date(this.gregorianModel.year, this.gregorianModel.month - 1, this.gregorianModel.day);
     this.gregorianUTCValue = this.withTime ? isoUTC : formatDate(jsDate, DateFormats.DATE_ONLY, 'en');
    this.gregorianUTC.emit(this.gregorianUTCValue);
    this.selectedDate = this.formatHijri(ngbDate);
    this.isShown = false;
  }

  showCalender(isOpen: boolean) {
    this.isShown = isOpen;
  }

  formatHijri(h: NgbDate): string {
    const hijriDay = h.day;
    const hijriMonth = getHijriMonthName(this.currentLang(), h.month);
    const hijriYear = h.year;
    const greg = this.hijriCal.toGregorian(h);
    const gregorianDay = greg.getDate();
    const gregorianMonth =
      getGregorianMonthName(this.currentLang(), greg.getMonth() + 1);
    const gregorianYear = greg.getFullYear();
    return `${gregorianDay} ${gregorianMonth} ${gregorianYear} - ${hijriDay} ${hijriMonth} ${hijriYear}`;
  }

}
