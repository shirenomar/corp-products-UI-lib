import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class GregorianCalendarComponent {
  @Input() model!: NgbDateStruct;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();
  private calendar = new NgbCalendarGregorian();
    isDisabled = () => false;
  isToday(date: NgbDateStruct): boolean {
    const today = this.calendar.getToday();
    return date.year === today.year &&
      date.month === today.month &&
      date.day === today.day;
  }
}
