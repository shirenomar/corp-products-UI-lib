import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class HijriCalendarComponent {

  @Input() model!: NgbDateStruct;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();

  private calendar = new NgbCalendarIslamicUmalqura();

  isToday(date: NgbDateStruct): boolean {
    const today = this.calendar.getToday();
    return date.year === today.year &&
           date.month === today.month &&
           date.day === today.day;
  }

  isDisabled = () => false;
}
