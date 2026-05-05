import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { ValidationErrorsPipe } from '../../@utils/validations/validation-message.pipe';
import { BaseInputComponent } from '../base-input.component';

@Component({
  selector: 'stc-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    ValidationErrorsPipe,
    NgClass,
    NgStyle,
    TranslatePipe,
    FloatLabelModule,
    InputIcon,
    IconField,
    InputNumberModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends BaseInputComponent {
  @Input() type: 'text' | 'textarea' | 'withIcon' | 'number' = 'text';
  @Input() contentType: 'text' | 'email' | 'number' = 'text';
  @Input() size: 'small' | 'large' = 'small';
  @Input() prefix: string;
  @Input() rows = 2;
  @Input() cols = 20;
  @Input() maxLength: number | null = null;
  @Input() autoResize = false;
  @Input() basicInput!: boolean;
  @Input() noStyle!: boolean;
  @Input() canClear!: boolean;
  @Input() hideOptionalLabel: boolean;
  @Input() inputDirection: 'ltr' | 'rtl' | 'inherit' = 'inherit';
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() defaultColor = '#DFE0E6';
  @Input() iconClass?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  constructor() {
    super();
  }

  clearInput() {
    this.control.reset();
  }
}
