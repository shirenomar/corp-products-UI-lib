/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NgClass } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsPipe } from '../../@utils/validations';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BaseInputComponent } from '../base-input.component';
import { DateHandler } from '../../../../helper/date-handler';
import { DateFormats } from '../../../../enums/date-formatter';

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
export class DatePickerComponent extends BaseInputComponent implements AfterViewInit {
  @Input() showIcon: boolean = false;
  @Input() showClear: boolean = false;
  @Input() basicInput!: boolean;
  @Input() isTimeOnly: boolean = false;
  @Input() minDate: Date | undefined | null;
  @Input() maxDate: Date | undefined | null;
  @Input() disabledDates: Date[] = [];
  @Input() disabledDays: number[] = []; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  @Input() hourFormat: '12' | '24' = '12';
  @Input() appendTo = 'body'
  nowTime = new Date();
  @Input() selectionMode: 'single' | 'range' = 'single';
  @Output() onAfterClearDate = new EventEmitter<void>();
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() withoutTime: boolean = false;
  @Input() allowManualInput: boolean = false;
  @ViewChild(DatePicker) private datePicker?: DatePicker;
  innerControl = new FormControl<Date | null>(null);
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (typeof this.control?.value === 'string') {
      const date = new Date(this.control.value);
      if (date) {
        this.innerControl.setValue(date, { emitEvent: false });
      }
    }

    this.control.valueChanges.subscribe((value) => {
      this.innerControl.setValue(new Date(value), { emitEvent: false });
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

  onManualInputCommit(): void {
    if (!this.allowManualInput || this.isTimeOnly || this.selectionMode !== 'single') {
      return;
    }

    const typed = (this.datePicker?.inputfieldViewChild?.nativeElement?.value ?? '').trim();

    if (!typed) {
      if (this.control.value) {
        this.control.setValue(null);
        this.control.markAsDirty();
        this.control.markAsTouched();
      }
      return;
    }

    this.control.markAsDirty();
    this.control.markAsTouched();

    const parsed = DateHandler.parseFlexibleDate(typed);

    if (!parsed) {
      this.rejectManualInput('invalidDateFormat');
      return;
    }

    if (this.datePicker && !this.datePicker.isValidSelection(parsed)) {
      this.rejectManualInput('dateNotAllowed');
      return;
    }

    this.datePicker?.updateModel(parsed);
    this.datePicker?.updateInputfield();
    this.datePicker?.updateUI();
    this.onDateChange(parsed);
  }

  private rejectManualInput(errorKey: string): void {
    this.control.setValue(null, { emitEvent: false });
    this.control.setErrors({ ...(this.control.errors ?? {}), [errorKey]: true });
  }

  onDateChange(value: Date): void {
    if (!value) return;
    const dateValue = value instanceof Date ? value : new Date(value);
    const formattedDate = this.withoutTime ?
      DateHandler.formatDate(dateValue.toISOString(), DateFormats.DATE_ONLY) : DateHandler.getUTCDateTimeFromJsDate(dateValue);
    this.control.setValue(formattedDate, { emitEvent: true });
  }
}
