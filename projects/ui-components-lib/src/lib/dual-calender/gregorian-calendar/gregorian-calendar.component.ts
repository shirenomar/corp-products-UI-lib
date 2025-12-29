import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DynamicGregorianI18n } from './../services/gregorian-i18n.service';


@Component({
  selector: "app-gregorian-calendar",
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
    { provide: NgbDatepickerI18n, useClass: DynamicGregorianI18n }
  ],
  templateUrl: "./gregorian-calendar.component.html",
  styleUrl: "./gregorian-calendar.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class GregorianCalendarComponent implements OnChanges {
  @Input() model!: NgbDateStruct;
  @Output() dateSelected = new EventEmitter<NgbDateStruct>();
  renderer = inject(Renderer2)
  @Input() language: 'ar' | 'en' = 'en';
  startDate!: NgbDateStruct;
  private calendar = new NgbCalendarGregorian();
  constructor(
    private i18n: NgbDatepickerI18n,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && changes['model'].currentValue) {
      this.startDate = { ...changes['model'].currentValue };
    }
    if (changes['language'] && this.i18n instanceof DynamicGregorianI18n) {
      this.i18n.setLanguage(this.language);
      this.cdr.detectChanges();
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

  isDisabled = () => false;
}
