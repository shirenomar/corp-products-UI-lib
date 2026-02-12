import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedLabelPipe } from '../../pipes/translate-key.pipe';
import { FileExtentions } from '../file-management/consts/accept-file-types';
import { FileManagementComponent } from '../file-management/file-management.component';
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
import { DualCalendarComponent } from './../dual-calender/dual-calendar.component';
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
    DualCalendarComponent,
    InputComponent,
    FileManagementComponent,
    SelectComponent,
    AutoCompleteComponent,
    SwitchComponent,
    LocalizedLabelPipe,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) dynamicFormData: DynamicFormData;
  // Generic field change outputs (optional for consumers)
  @Output() selectButtonChange = new EventEmitter<{ name: string; value: any }>();
  @Output() selectChange = new EventEmitter<{ name: string; event: any }>();
  @Output() selectClicked = new EventEmitter<{ name: string; event: any }>();
  @Output() switchChange = new EventEmitter<{ name: string; value: boolean }>();
  @Output() autoCompleteSearch = new EventEmitter<{ name: string; query: string }>();
  @Output() autoCompleteSelect = new EventEmitter<{ name: string; event: any }>();
  @Output() popUpFilesUploaded = new EventEmitter<any>();
  @Output() fileDeleted = new EventEmitter<{ fileId: string; isNew: boolean }>();
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
  getAcceptedTypes(): string {
    return FileExtentions.toString();
  }

  onFilesUploaded(file: any) {
    this.popUpFilesUploaded.emit(file);
  }
  onFileDeleted(file: any) {
    this.fileDeleted.emit(file);
  }
}
