import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PrimeTemplate } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { Select, SelectChangeEvent } from 'primeng/select';
import { ValidationErrorsPipe } from '../../@utils/validations';
import { BaseInputComponent } from '../base-input.component';
import { AppButtonComponent } from './../../../app-button/app-button.component';

import { IconField } from 'primeng/iconfield';
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
    AppButtonComponent,
    IconField,
    ValidationErrorsPipe,
    MultiSelectModule,
    FloatLabelModule,
    TranslatePipe
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent extends BaseInputComponent implements OnInit {
  @Input() selectedItemTemplate: TemplateRef<unknown> | null = null;
  @Input() optionTemplate: TemplateRef<unknown> | null = null;
  @Input() options: unknown[];
  @Input() optionLabel!: string;
  @Input() emptyMessage!: string;
  @Input() checkmark = true;
  @Input() showClear = false;
  @Input() editable = false;
  @Input() filter = false;
  @Input() multiple = false;
  @Input() filterBy!: string;
  @Input() size: 'small' | 'large' = "small";
  @Input() selectedItemsLabel!: string;
  @Input() basicInput!: boolean;
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Input() isEditSearch = false
  @Input() defaultColor = '#DFE0E6'
  @Input() filteredOptions: unknown[];

@ViewChild('selectRef') select!: Select;
  private translate = inject(TranslateService);
  @Output() addValue = new EventEmitter()
  filterValue = signal<string>('');
  constructor() {
    super();
  }
  addNewItem(item: string) {
    this.addValue.emit(item)
  }
  onFilter(event: any) {
    // PrimeNG sends the typed value here
    this.filterValue.set(event.filter?.trim());
  }
handleFocus() {
  // small timeout ensures focus finishes before opening
  setTimeout(() => {
    this.select.show();
  });
}
  onChange(e: SelectChangeEvent) {
    const search = this.options.filter((opt: any) =>
      opt[this.optionLabel]
        ?.toLowerCase()
        .includes(e.value.toLowerCase())
    );
    this.onFilterValueChange(e.value)
    this.filteredOptions = [...search]
    this.change.emit(e);
  }
  onFilterValueChange(value: string) {
    this.filterValue.set(value);
  }
  get addLabel(): string {
    if (!this.filterValue) return this.translate.instant('shared.buttons.add');
    return `${this.translate.instant('shared.buttons.add')} "${this.filterValue()}"`;
  }
  clearFilter(event: MouseEvent): void {
    event.stopPropagation();
    this.filterValue.set('');
    this.control.setValue(this.control.value);
  }

}
