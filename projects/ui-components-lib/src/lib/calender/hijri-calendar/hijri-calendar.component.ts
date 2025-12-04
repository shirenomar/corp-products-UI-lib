import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { IslamicI18n } from '../islamic-i18n.service';

@Component({
  selector: "app-hijri-calendar",
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ],
  templateUrl: "./hijri-calendar.component.html",
  styleUrl: "./hijri-calendar.component.scss"
})
export class HijriCalendarComponent implements OnChanges {
 @Input() model!: NgbDateStruct;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();

  startDate!: NgbDateStruct;
  private calendar = new NgbCalendarIslamicUmalqura();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue) {
      this.startDate = { ...changes['model'].currentValue };
      console.log('Hijri navigating to:', this.startDate);
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
