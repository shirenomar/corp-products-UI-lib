import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { LocalizedLabelPipe } from '../../pipes/translate-key.pipe';
import { FileExtentions, formatFileExtensionsForAccept } from '../file-management/consts/accept-file-types';
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
import {
  DynamicFormData,
  FileUploadConfig,
  FileUploadState,
  FormFieldTypeEnum,
  InputsMap,
} from './dynamic-form.interface';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    DatePickerComponent,
    ValidationErrorsPipe,
    TranslatePipe,
    SelectButtonComponent,
    DualCalendarComponent,
    InputComponent,
    FileManagementComponent,
    SelectComponent,
    AutoCompleteComponent,
    SwitchComponent,
    LocalizedLabelPipe,
    CheckboxModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input({ required: true }) dynamicFormData: DynamicFormData;
  @Output() selectButtonChange = new EventEmitter<{ name: string; value: any }>();
  @Output() selectChange = new EventEmitter<{ name: string; event: any }>();
  @Output() selectClicked = new EventEmitter<{ name: string; event: any }>();
  @Output() switchChange = new EventEmitter<{ name: string; value: boolean }>();
  @Output() autoCompleteSearch = new EventEmitter<{ name: string; query: string }>();
  @Output() autoCompleteSelect = new EventEmitter<{ name: string; event: any }>();
  @Output() popUpFilesUploaded = new EventEmitter<any>();
  @Output() fileDeleted = new EventEmitter<{ fileId: string; isNew: boolean }>();
  @Output() uploadStateChange = new EventEmitter<FileUploadState>();

  inputsNames: string[] = [];
  formGroup: FormGroup;
  inputsMap: InputsMap;
  standaloneFileControl = new FormControl<string | null>(null);
  readonly fieldType = FormFieldTypeEnum;
  getFormControl = FormUtils.getFormControl;

  get fileUploadConfig(): FileUploadConfig | undefined {
    return this.dynamicFormData?.fileUpload;
  }

  ngOnInit(): void {
    this.updateFormState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicFormData'] && !changes['dynamicFormData'].isFirstChange()) {
      this.updateFormState();
    }
  }

  private updateFormState(): void {
    this.formGroup = this.dynamicFormData?.formGroup as FormGroup;
    this.inputsMap = this.dynamicFormData?.inputsMap as InputsMap;
    this.inputsNames = Object.keys(this.inputsMap || {});
  }

  getAcceptedTypes(fileUpload?: FileUploadConfig): string {
    if (fileUpload?.acceptedTypes) {
      return fileUpload.acceptedTypes;
    }
    return formatFileExtensionsForAccept(FileExtentions);
  }

  getMaxFileSize(fileUpload?: FileUploadConfig): number {
    return fileUpload?.maxFileSize ?? 262144000;
  }

  getFileUploadConfig(inputName: string): FileUploadConfig | undefined {
    return this.inputsMap[inputName]?.fileUpload ?? this.dynamicFormData?.fileUpload;
  }

  hasUploadFileField(): boolean {
    return this.inputsNames.some((name) => this.inputsMap[name].fieldType === FormFieldTypeEnum.UPLOAD_FILE);
  }

  onFilesUploaded(file: any) {
    this.popUpFilesUploaded.emit(file);
  }

  onFileDeleted(file: any) {
    this.fileDeleted.emit(file);
  }

  onUploadStateChange(state: FileUploadState) {
    this.uploadStateChange.emit(state);
  }
}
