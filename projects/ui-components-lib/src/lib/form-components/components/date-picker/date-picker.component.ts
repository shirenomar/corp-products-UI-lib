/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsPipe } from '../../@utils/validations';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { BaseInputComponent } from '../base-input.component';
import { DateHandler } from '../../../../helper/date-handler';
import { DateFormats } from '../../../../enums/date-formatter';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'stc-date-picker',
  standalone: true,
  imports: [
    FormsModule,
    DatePicker,
    ReactiveFormsModule,
    NgClass,
    DatePickerModule,
    TranslatePipe,
    ValidationErrorsPipe,
    FloatLabelModule,
    NgTemplateOutlet
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
  @Input() floatLabel: boolean = true;
  nowTime = new Date();
  @Input() selectionMode: 'single' | 'range' = 'single';
  @Output() onAfterClearDate = new EventEmitter<void>();
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() withoutTime: boolean = false;
  innerControl = new FormControl<Date | Date[] | null>(null);
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.selectionMode === 'range') {
      this.initRangeMode();
    } else {
      this.initSingleMode();
    }
  }

  initSingleMode(): void {
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

  private initRangeMode(): void {
    this.applyRangeValue(this.control?.value);

    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.applyRangeValue(value);
    });
  }

  private applyRangeValue(raw: [Date, Date] | null): void {
    if (!raw) {
      this.innerControl.reset(null, { emitEvent: false });
      return;
    } else {
      this.innerControl.setValue(raw, { emitEvent: false });
    }
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
    this.control.markAsTouched();
  }

  onBlur(): void {
    this.control.markAsTouched();
  }

  afterClearDate() {
    this.control.reset();
    this.control.markAsTouched();
    this.onAfterClearDate.emit();
  }

  onDateChange(value: Date): void {
    if (!value) return;

    if (this.selectionMode === 'range') {
        setTimeout(() => {
          const rangeValue = this.innerControl.value as Date[] | null;
          if (!rangeValue || rangeValue.length < 2 || !rangeValue[0] || !rangeValue[1]) {
            return;
          }
          this.control.setValue(rangeValue, { emitEvent: true });
        });
    } else {
      const dateValue = value instanceof Date ? value : new Date(value);
      const formattedDate = this.withoutTime ?
        DateHandler.formatDate(dateValue.toISOString(), DateFormats.DATE_ONLY) : DateHandler.getUTCDateTimeFromJsDate(dateValue);
      this.control.setValue(formattedDate, { emitEvent: true });
    }
    this.control.markAsTouched();
    this.control.markAsDirty();
  }
}
