import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  AutoCompleteComponent,
  DatePickerComponent,
  FormUtils,
  InputComponent,
  SelectButtonComponent,
  SelectComponent,
  SwitchComponent,
  ValidationErrorsPipe,
} from '../form-components';
import { DynamicFormData, FormFieldTypeEnum, InputsMap } from './dynamic-form.interface';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePickerComponent,
    ValidationErrorsPipe,
    TranslateModule,
    SelectButtonComponent,
    InputComponent,
    SelectComponent,
    AutoCompleteComponent,
    SwitchComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) dynamicFormData: DynamicFormData;
  // Generic field change outputs (optional for consumers)
  @Output() selectButtonChange = new EventEmitter<{ name: string; value: any }>();
  @Output() selectChange = new EventEmitter<{ name: string; event: any }>();
  @Output() switchChange = new EventEmitter<{ name: string; value: boolean }>();
  @Output() autoCompleteSearch = new EventEmitter<{ name: string; query: string }>();
  @Output() autoCompleteSelect = new EventEmitter<{ name: string; event: any }>();
  inputsNames: string[] = [];
  formGroup: FormGroup;
  inputsMap: InputsMap;
  readonly fieldType = FormFieldTypeEnum;
  getFormControl = FormUtils.getFormControl;

  ngOnInit(): void {
    this.formGroup = this.dynamicFormData?.formGroup as FormGroup;
    this.inputsMap = this.dynamicFormData?.inputsMap as InputsMap;
    this.inputsNames = Object.keys(this.inputsMap || {});
  }

  onSwitchChange(name: string, event: any) {
    const value = typeof event === 'boolean' ? event : event === 'true';
    this.getFormControl(name, this.formGroup).setValue(value);
    this.switchChange.emit({ name, value });
  }
}
