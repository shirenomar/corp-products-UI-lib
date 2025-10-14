import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ValidationErrorsPipe } from '@corp-products/ui-components';
import { TranslatePipe } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { BaseInputComponent } from '../base-input.component';

@Component({
  selector: 'stc-checkbox',
  imports: [CheckboxModule, CommonModule, ValidationErrorsPipe, TranslatePipe],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends BaseInputComponent {
  @Input() value: any;
  @Input() binary: boolean = false;
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input() inputClass: string;
  @Input() size: 'small' | 'large' = 'small';
  @Input() falseValue: boolean = false;
  @Input() trueValue: boolean = true;
  @Input() checkboxIcon: string = '';
  @Output() onChange = new EventEmitter<any>();

  constructor() {
    super();
  }
}
