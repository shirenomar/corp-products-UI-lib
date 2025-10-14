import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PrimeTemplate } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select, SelectChangeEvent } from 'primeng/select';
import { ValidationErrorsPipe } from '../../@utils/validations';
import { BaseInputComponent } from '../base-input.component';

@Component({
  selector: 'stc-select',
  standalone: true,
  imports: [
    FormsModule,
    Select,
    ReactiveFormsModule,
    NgClass,
    NgTemplateOutlet,
    PrimeTemplate,
    ValidationErrorsPipe,
    MultiSelectModule,
    TranslatePipe,
    FloatLabelModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent extends BaseInputComponent {
  @Input() selectedItemTemplate: TemplateRef<unknown> | null = null;
  @Input() optionTemplate: TemplateRef<unknown> | null = null;
  @Input() options: unknown[];
  @Input() optionLabel!: string;
  @Input() checkmark = true;
  @Input() showClear = false;
  @Input() editable = false;
  @Input() filter = false;
  @Input() multiple = false;
  @Input() filterBy!: string;
  @Input() selectedItemsLabel!: string;
  @Input() basicInput!: boolean;
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Input() customClasses = ''

  constructor() {
    super();
  }

  onChange(e: SelectChangeEvent) {
    this.change.emit(e);
  }
}
