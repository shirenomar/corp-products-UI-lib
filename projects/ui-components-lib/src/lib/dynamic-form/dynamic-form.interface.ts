import {FormGroup} from "@angular/forms";
import {LabelValue} from "../form-components";

export type InputType = "text" | "textarea";
export type InputContentType = "text" | "email" | "password" | "number";

export interface Dropdown<T = unknown> {
  id?: string;
  keyValue: T;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
}

export interface InputsMapData {
  // General props
  label: string;
  rowSize?: "half" | "full";
  fieldType: FormFieldTypeEnum;
  inputId?: string;

  // Date
  dateRange?: DateRangeInterface;
  isTimeOnly?: boolean;
  showIcon?: boolean;

  //select button
  selectButtonOptions?: LabelValue<any>[];
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
  DATE_PICKER = "date-picker",
  SELECT_BUTTON = "select-button"
}
