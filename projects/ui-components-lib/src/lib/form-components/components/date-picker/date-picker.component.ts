import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsPipe } from '../../@utils/validations/validation-message.pipe';
import { DatePicker } from 'primeng/datepicker';
import { BaseInputComponent } from '../base-input.component';
import { DatePickerModule } from 'primeng/datepicker';
import { TranslatePipe } from '@ngx-translate/core';
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
    TranslatePipe,
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

  constructor() {
    super();
  }

  selectCurrentTime(e: any) {
    this.control.setValue(this.nowTime);
  }

  clearButtonClick(e: any) {
    this.control.setValue(null);
  }

  afterClearDate() {
    this.control.reset();
    this.onAfterClearDate.emit();
  }
}
