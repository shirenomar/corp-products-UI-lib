import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, Renderer2, SimpleChanges } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DynamicHijriI18n } from '../services/islamic-i18n.service';

@Component({
  selector: "app-hijri-calendar",
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: DynamicHijriI18n }
  ],
  templateUrl: "./hijri-calendar.component.html",
  styleUrl: "./hijri-calendar.component.scss"
})
export class HijriCalendarComponent  implements OnChanges   {
  @Input() model!: NgbDateStruct;
  @Input() disabledDays: number[] = []; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  @Input() disabledDates: Date[] = [];
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();
  @Input() language: 'ar' | 'en' = 'en';
  renderer = inject(Renderer2)

  startDate!: NgbDateStruct;
  private calendar = new NgbCalendarIslamicUmalqura();
  constructor(
    private i18n: NgbDatepickerI18n,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue) {
      this.startDate = { ...changes['model'].currentValue };
      console.log('Hijri navigating to:', this.startDate);
    }

    if (changes['language'] && this.i18n instanceof DynamicHijriI18n) {
      this.i18n.setLanguage(this.language);
      this.cdr.detectChanges(); // Force re-render to update labels
    }
  }
ngAfterViewInit() {
  const buttons = document.querySelectorAll('.ngb-dp-arrow-btn');
  buttons.forEach(btn => {
    this.renderer.removeAttribute(btn, 'title');
  });
}
  onDateChange(date: NgbDateStruct) {
    this.model = date;
    this.startDate = { ...date };
  }

  isToday(date: NgbDateStruct): boolean {
    const today = this.calendar.getToday();
    return date.year === today.year &&
      date.month === today.month &&
      date.day === today.day;
  }

  isDisabled = (date: NgbDateStruct): boolean => {
    const ngbDate = new NgbDate(date.year, date.month, date.day);
    const gregDate = this.calendar.toGregorian(ngbDate);

    if (this.disabledDays?.length && this.disabledDays.includes(gregDate.getDay())) {
      return true;
    }

    if (this.disabledDates?.length) {
      return this.disabledDates.some(
        (d) =>
          d.getFullYear() === gregDate.getFullYear() &&
          d.getMonth() === gregDate.getMonth() &&
          d.getDate() === gregDate.getDate()
      );
    }

    return false;
  };
}
