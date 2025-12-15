import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
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
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None
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
  @Input() size: 'small' | 'large' = "small";
  @Input() selectedItemsLabel!: string;
  @Input() basicInput!: boolean;
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Input() defaultColor = '#DFE0E6'

  private translate = inject(TranslateService);
  @Output() addValue = new EventEmitter()
  filterValue = '';
  constructor() {
    super();
  }
  addNewItem(item: string) {
    this.addValue.emit(item)
  }
  onFilter(event: any) {
    // PrimeNG sends the typed value here
    this.filterValue = event.filter?.trim();
  }
  onChange(e: SelectChangeEvent) {
    this.change.emit(e);
  }
  onFilterValueChange(value: string) {
    this.filterValue = value;
  }
  get addLabel(): string {
    if (!this.filterValue) return this.translate.instant('shared.buttons.add');
    return `${this.translate.instant('shared.buttons.add')} "${this.filterValue}"`;
  }
  clearFilter(event: MouseEvent): void {
    event.stopPropagation();
    this.filterValue = '';
    this.control.setValue(this.control.value);
  }

}
