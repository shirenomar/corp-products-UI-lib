import { NgClass } from '@angular/common';
import {  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ValidationErrorsPipe } from '../../form-components/@utils/validations/validation-message.pipe';
import { BaseInputComponent } from '../../form-components/components/base-input.component';
import { InputText } from 'primeng/inputtext';
@Component({
  selector: 'stc-date-picker-switcher',
  standalone: true,
  imports: [
  FormsModule,
    DatePicker,
    ReactiveFormsModule,
    NgClass,
    InputText,
    DatePickerModule,
    ValidationErrorsPipe,
    TranslatePipe,
    FloatLabelModule,
  ],
  templateUrl: './date-picker-switcher.component.html',
  styleUrl: './date-picker-switcher.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerSwitcherComponent extends BaseInputComponent  implements OnChanges {
  @Input() type: 'text' | 'textarea' = 'text';
  @Input() contentType: 'text' | 'email' | 'number' = 'text';
  @Input() size: 'small' | 'large' = "small";
  @Input() prefix: string;
  @Input() rows = 2;
  @Input() cols = 20;
  @Input() autoResize = true;
  @Input() basicInput!: boolean;
  @Input() noStyle!: boolean;
  @Input() hideOptionalLabel: boolean;
  @Input() inputDirection: 'ltr' | 'rtl' | 'inherit' = 'inherit';
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() defaultColor = '#DFE0E6'
  @Input() formattedDate = '';
  @Output() openCalender = new EventEmitter<boolean>();
  constructor( ) {
    super();
  }
    ngOnChanges(changes: SimpleChanges) {
    if (changes['formattedDate'] && changes['formattedDate'].currentValue) {
      // Update the FormControl value if parent changes the formattedDate
      this.control.setValue(changes['formattedDate'].currentValue, { emitEvent: false });
    }
  }
  override ngOnInit() {
    this.control.setValue(this.formattedDate);
  }

  clearButtonClick(e: any) {
    this.control.setValue(null);
  }

  openCalendar(isOpen: boolean) {
    this.openCalender.emit(isOpen)

  }
}
