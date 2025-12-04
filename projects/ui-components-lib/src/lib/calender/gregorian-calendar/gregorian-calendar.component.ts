import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: "app-gregorian-calendar",
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarGregorian }
  ],
  templateUrl: "./gregorian-calendar.component.html",
  styleUrl: "./gregorian-calendar.component.scss"
})
export class GregorianCalendarComponent implements OnChanges{
  @Input() model!: NgbDateStruct;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();

  startDate!: NgbDateStruct;
  private calendar = new NgbCalendarGregorian();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue) {
      this.startDate = { ...changes['model'].currentValue };
      console.log('Gregorian navigating to:', this.startDate);
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
