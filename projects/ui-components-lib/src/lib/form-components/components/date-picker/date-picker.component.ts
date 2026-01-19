import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ValidationErrorsPipe } from '../../@utils/validations/validation-message.pipe';
import { BaseInputComponent } from '../base-input.component';
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
  @Input() withTime: boolean = false;

  constructor() {
    super();
  }

  selectCurrentTime(e: any) {
    if (this.withTime) {
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
    if (!this.withTime || !value) return;
    const dateOnly = value instanceof Date ? value.toISOString().split('T')[0] : value;
    this.control.setValue(dateOnly, { emitEvent: false });
  }
}
