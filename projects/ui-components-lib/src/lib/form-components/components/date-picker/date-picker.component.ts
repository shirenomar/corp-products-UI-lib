import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsPipe } from '@corp-products/ui-components';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BaseInputComponent } from '../base-input.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'stc-date-picker',
  standalone: true,
  imports: [
    FormsModule,
    DatePicker,
    ReactiveFormsModule,
    NgClass,
    DatePickerModule,
    ValidationErrorsPipe,
    FloatLabelModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent extends BaseInputComponent {
  @Input() showIcon: boolean = false;
  @Input() showClear: boolean = false;
  @Input() basicInput!: boolean;
  @Input() isTimeOnly: boolean = false;
  @Input() minDate: Date | undefined | null;
  @Input() maxDate: Date | undefined | null;
  @Input() hourFormat: '12' | '24' = '12';
  nowTime = new Date();
  @Input() selectionMode: 'single' | 'range' = 'single';
  @Output() onAfterClearDate = new EventEmitter<void>();
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() withoutTime: boolean = false;
  innerControl = new FormControl<Date | null>(null);

  constructor() {
    super();
  }

  override ngOnInit() {
    if (typeof this.control?.value === 'string') {
      const date = new Date(this.control.value);
      if (date) {
        this.innerControl.setValue(date, { emitEvent: false });
      }
    }

    this.control.valueChanges.subscribe((value) => {
      if (!value) this.innerControl.reset();
    });
  }

  selectCurrentTime(e: any) {
    if (this.withoutTime) {
      const d = new Date();
      this.control.setValue(d.toISOString().split('T')[0]);
      return;
    }
    this.control.setValue(this.nowTime);
  }

  clearButtonClick(e: any) {
    this.control.setValue(null);
  }

  afterClearDate() {
    this.control.reset();
    this.onAfterClearDate.emit();
  }

  onDateChange(value: any) {
    if (!this.withoutTime || !value) return;
    const dateOnly = value instanceof Date ? formatDate(value, 'yyyy-MM-dd', 'en-US') : value;
    this.control.setValue(dateOnly, { emitEvent: true });
  }
}
