import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PrimeTemplate } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
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
    FloatLabelModule,
    TranslatePipe,
    CheckboxModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends BaseInputComponent {
  @Input() selectedItemTemplate: TemplateRef<unknown> | null = null;
  @Input() optionTemplate: TemplateRef<unknown> | null = null;
  @Input() options: unknown[] = [];
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
  @Input() scrollHeight = '200px';
  @Input() appendTo = '';

  @Input() selectedItemsLabel!: string;
  @Input() basicInput!: boolean;
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Output() change = new EventEmitter();
  @Output() clicked = new EventEmitter();

  @Input() defaultColor = '#DFE0E6';
  allSelectd = false;

  constructor() {
    super();
  }

  toggleAll(event: any) {
    if (!event.checked) {
      this.control.setValue([]);
      return;
    }
    const values = this.optionValue
      ? this.options.map((o) => (o as Record<string, unknown>)[this.optionValue as string])
      : this.options;
    this.control.setValue([...values]);
  }

  onMultiSelectClear() {
    this.allSelectd = false;
  }

  onChange(e: SelectChangeEvent) {
    this.change.emit(e);
  }

  onClick(event: Event) {
    this.clicked.emit(event);
  }
}
