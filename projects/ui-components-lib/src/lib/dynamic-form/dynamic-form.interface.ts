import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LabelValue } from '../form-components';
import { FileUploadResponse, FileUploadState } from '../file-management/interfaces/file.interface';

export type { FileUploadResponse, FileUploadState };

export interface FileUploadConfig {
  uploadFn: (file: File) => Observable<FileUploadResponse>;
  acceptedTypes?: string;
  maxFileSize?: number;
}

export type InputType = 'text' | 'textarea' | 'number';
export type InputContentType = 'text' | 'email' | 'number';

export interface Dropdown<T = unknown> {
  id?: string;
  keyValue: T;
  label: string;
  labelAr?: string;
  labelEn?: string;
  icon?: string;
  hidden?: boolean;
  disabled?: boolean;
}

export interface InputsMapData {
  // General props
  label: string;
  rowSize?: string;
  fieldType: FormFieldTypeEnum;
  inputId?: string;
  placeholder?: string;
  hint?: string;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
  maxLength?: number;
  minlength?: number;
  // Date
  dateRange?: DateRangeInterface;
  allowManualInput?: boolean;
  disabledDates?: Date[];
  disabledDays?: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  isTimeOnly?: boolean;
  showIcon?: boolean;
  withoutTime?: boolean;
  //select button
  selectButtonOptions?: LabelValue<any>[];

  // Input (text/textarea)
  inputType?: InputType;
  contentType?: InputContentType;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  prefix?: string;
  size?: 'small' | 'large';
  variant?: 'in' | 'over' | 'on';
  canClear?: boolean;

  // Icon field
  iconClass?: string;

  // Select dropdown
  selectOptions?: unknown[]; // Array of objects or primitives
  translatable?: boolean;
  optionLabel?: string; // property name to display when options are objects
  optionValue?: string; // property name to bind when options are objects
  filter?: boolean;
  multiple?: boolean;
  showClear?: boolean;
  checkmark?: boolean;
  scrollHeight?: string;
  filterBy?: string;
  selectedItemsLabel?: string;
  optionTemplate?: OptionTemplateConfig; // Custom template config for rendering options with image, main text, and subtext

  // Auto-complete
  autoCompleteItems?: unknown[];
  minLengthToSearch?: number;
  delay?: number;
  allowedDomains?: string[] | undefined;

  // File upload
  fileUpload?: FileUploadConfig;
}

export interface InputsMap {
  [key: string]: InputsMapData;
}

export interface DynamicFormData {
  isActive?: boolean;
  formGroup: FormGroup | null;
  inputsMap: InputsMap | null;
  title?: string;
  isReadOnlyForm?: boolean;
  formValidationErrorsKeys?: string[];
  fileUpload?: FileUploadConfig;
}

export interface DateRangeInterface {
  min?: Date | null; // Static range, hard coded
  max?: Date | null; // Static range, hard coded
  notBeforeDateInput?: string; // For dynamic date range validation
  notAfterDateInput?: string; // For dynamic date range validation
  notBeforeOrSameDateInput?: string;
  notAfterOrSameDateInput?: string;
}

export interface OptionTemplateConfig {
  imageKey?: string;
  mainTextKey: string;
  subTextKey?: string;
}

export enum FormFieldTypeEnum {
  DATE_PICKER = 'date-picker',
  SELECT_BUTTON = 'select-button',
  INPUT = 'input',
  SELECT = 'select',
  SWITCH = 'switch',
  AUTO_COMPLETE = 'auto-complete',
  HIJRI_DATE_PICKER = 'hijri-date',
  UPLOAD_FILE = 'upload-file',
  CHECKBOX = 'checkbox',
  ICON_FIELD = 'icon-field',
}
