import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PrimeTemplate } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select, SelectChangeEvent } from 'primeng/select';
import { ValidationErrorsPipe } from '../../@utils/validations';
import { BaseInputComponent } from '../base-input.component';
import { CheckboxModule } from 'primeng/checkbox';

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
    FloatLabelModule,
    TranslatePipe,
    CheckboxModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent extends BaseInputComponent {
  @Input() selectedItemTemplate: TemplateRef<unknown> | null = null;
  @Input() optionTemplate: TemplateRef<unknown> | null = null;
  @Input() options: Array<string | Record<string, unknown>> = [];
  @Input() optionLabel!: string;
  @Input() optionValue!: string;
  @Input() emptyMessage!: string;
  @Input() checkmark = true;
  @Input() showClear = false;
  @Input() editable = false;
  @Input() filter = false;
  @Input() multiple = false;
  @Input() filterBy!: string;
  @Input() selectAllLabel: string;
  @Input() dataKey!: string;
  @Input() size: 'small' | 'large' = 'small';

  @Input() selectedItemsLabel!: string;
  @Input() basicInput!: boolean;
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Input() defaultColor = '#DFE0E6';

  constructor() {
    super();
  }

  toggleAll(event: any) {
  if (!event.checked) {
    this.control.setValue([]);
    return;
  }

  if(this.optionValue){
    const values = this.options.map(o => (o as Record<string, unknown>)[this.optionValue as string]);
    this.control.setValue([...values]);
  }
  else {
    this.control.setValue([...this.options]);
  }
}

  onChange(e: SelectChangeEvent) {
    this.change.emit(e);
  }
}
