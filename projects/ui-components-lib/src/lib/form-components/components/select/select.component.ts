import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ValidationErrorsPipe } from "../../@utils/validations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Select, SelectChangeEvent } from "primeng/select";
import { BaseInputComponent } from "../base-input.component";
import { MultiSelectModule } from 'primeng/multiselect';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: "stc-select",
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
    TranslatePipe
  ],
  templateUrl: "./select.component.html",
  styleUrl: "./select.component.scss"
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
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();

  constructor() {
    super();
  }

  onChange(e: SelectChangeEvent) {
    this.change.emit(e);
  }
}
