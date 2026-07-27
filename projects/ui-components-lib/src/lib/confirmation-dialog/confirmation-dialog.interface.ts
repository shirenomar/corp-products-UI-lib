import { FileUploadConfig } from '../dynamic-form/dynamic-form.interface';

export type { FileUploadConfig, FileUploadResponse } from '../dynamic-form/dynamic-form.interface';

export interface ConfirmationDialogData {
  header: string;
  message: string;
  confirmBtnId: string;
  cancelBtnId: string;
  cancelBtnLabel?: string;
  confirmBtnLabel?: string;
  confirmBtnIcon?: string;
  confirmBtnPosition?: string;
  hint?: string;
  inputForm?: any;
  breakpoints?: any;
  fileUpload?: FileUploadConfig;
}
