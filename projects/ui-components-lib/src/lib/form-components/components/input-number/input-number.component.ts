import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorsPipe } from '@corp-products/ui-components';
import {
  InputNumber,
  InputNumberModule,
  InputNumberStyle,
} from 'primeng/inputnumber';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'stc-input-number',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    ValidationErrorsPipe,
  ],
  providers: [InputNumberStyle],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InputNumberComponent extends InputNumber {
  @Input() label?: string;
  @Input() hint?: string;
  @Input() wrapperClass = '';
  @Input() labelClass = '';
  @Input({ required: true }) control!: FormControl;

  get isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  get isInvalid(): boolean {
    return this.control.invalid;
  }
}
