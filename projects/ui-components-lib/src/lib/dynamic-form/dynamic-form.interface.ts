import { FormGroup } from '@angular/forms';
import { LabelValue } from '../form-components';

export type InputType = 'text' | 'textarea';
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
  isTimeOnly?: boolean;
  showIcon?: boolean;

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

  // Select dropdown
  selectOptions?: unknown[]; // Array of objects or primitives
  translatable?: boolean;
  optionLabel?: string; // property name to display when options are objects
  optionValue?: string; // property name to bind when options are objects
  filter?: boolean;
  multiple?: boolean;
  showClear?: boolean;
  checkmark?: boolean;
  filterBy?: string;
  selectedItemsLabel?: string;

  // Auto-complete
  autoCompleteItems?: unknown[];
  minLengthToSearch?: number;
  delay?: number;
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
}

export interface DateRangeInterface {
  min?: Date | null; // Static range, hard coded
  max?: Date | null; // Static range, hard coded
  notBeforeDateInput?: string; // For dynamic date range validation
  notAfterDateInput?: string; // For dynamic date range validation
  notBeforeOrSameDateInput?: string;
  notAfterOrSameDateInput?: string;
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
}
