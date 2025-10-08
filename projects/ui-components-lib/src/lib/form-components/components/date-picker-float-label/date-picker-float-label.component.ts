import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ValidationErrorsPipe } from '../../@utils/validations/validation-message.pipe';
import { BaseInputComponent } from '../base-input.component';
@Component({
  selector: 'stc-date-picker-floating',
  standalone: true,
  imports: [
    FormsModule,
    DatePicker,
    ReactiveFormsModule,
    NgClass,
    DatePickerModule,
    ValidationErrorsPipe,
    TranslatePipe,
    FloatLabelModule,
  ],
  templateUrl: './date-picker-float-label.component.html',
  styleUrl: './date-picker-float-label.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerFloatComponent extends BaseInputComponent {
  @Input() showIcon: boolean = false;
  @Input() showClear: boolean = false;
  @Input() basicInput!: boolean;
  @Input() isTimeOnly: boolean = false;
  @Input() minDate: Date | undefined | null;
  @Input() maxDate: Date | undefined | null;
  @Input() hourFormat: '12' | '24' = '12';
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() floatLabel: string;
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
