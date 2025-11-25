import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DateHandler } from '../../../../helper/date-handler';
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
  @Input() dateFormat: string = 'mm/dd/yy';

  constructor() {
    super();
  }

  onDateSelect(event: Date) {
    if (event && event instanceof Date) {
      const isoDateTime = DateHandler.getISODateTime(event);
      this.control.setValue(isoDateTime, { emitEvent: false, emitModelToViewChange: false });
    }
  }

  onDateType($event: any) {
    // Support both Date (rare on input) and InputEvent/String
    if ($event instanceof Date) {
      const isoDateTime = DateHandler.getISODateTime($event);
      this.control.setValue(isoDateTime, { emitEvent: false, emitModelToViewChange: false });
      return;
    }

    let typed: string | undefined;
    if (typeof $event === 'string') {
      typed = $event;
    } else if ($event?.target?.value) {
      typed = $event.target.value;
    }

    if (!typed) return;
    typed = typed.trim();
    if (!typed) return;

    // Cache the Luxon format conversion if dateFormat doesn't change frequently
    const luxonFormat = this.dateFormat.replace(/m/g, 'M');

    const dt = DateTime.fromFormat(typed, luxonFormat);
    if (dt.isValid) {
      const isoDateTime = DateHandler.getISODateTime(dt.toJSDate());
      this.control.setValue(isoDateTime, { emitEvent: false, emitModelToViewChange: false });
      return;
    }

    // Fallback: try native Date parsing only if Luxon parsing fails
    const fallback = new Date(typed);
    if (!isNaN(fallback.getTime())) {
      const isoDateTime = DateHandler.getISODateTime(fallback);
      this.control.setValue(isoDateTime, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: true,
      });
    }
  }

  selectCurrentTime(e: any) {
    const isoDateTime = DateHandler.getISODateTime(this.nowTime);
    this.control.setValue(isoDateTime);
  }

  clearButtonClick(e: any) {
    this.control.setValue(null);
  }

  afterClearDate() {
    this.control.reset();
    this.onAfterClearDate.emit();
  }
}
