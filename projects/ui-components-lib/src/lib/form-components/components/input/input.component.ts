import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatLabelModule } from 'primeng/floatlabel';
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
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent extends BaseInputComponent {
  @Input() type: 'text' | 'textarea' = 'text';
  @Input() contentType: 'text' | 'email' | 'number' = 'text';
  @Input() size: 'small' | 'large' = "small";
  @Input() prefix: string;
  @Input() rows = 2;
  @Input() cols = 20;
  @Input() autoResize = false;
  @Input() basicInput!: boolean;
  @Input() noStyle!: boolean;
  @Input() hideOptionalLabel: boolean;
  @Input() inputDirection: 'ltr' | 'rtl' | 'inherit' = 'inherit';
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() defaultColor = '#DFE0E6'


  constructor() {
    super();
  }
}
