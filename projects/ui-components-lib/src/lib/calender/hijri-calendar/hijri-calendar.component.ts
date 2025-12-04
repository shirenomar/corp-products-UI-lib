import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DynamicHijriI18n, HijriEnglishI18n, IslamicI18n } from '../islamic-i18n.service';

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
export class HijriCalendarComponent implements OnChanges {
  @Input() model!: NgbDateStruct;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();
  @Input() language: 'ar' | 'en' = 'en';
  startDate!: NgbDateStruct;
  private calendar = new NgbCalendarIslamicUmalqura();
  constructor(
    private i18n: NgbDatepickerI18n,
    private cdr: ChangeDetectorRef
  ) { }
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

  isDisabled = () => false;
}
