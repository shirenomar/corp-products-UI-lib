import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent, DynamicFormData, FormFieldTypeEnum } from '@corp-products/ui-components';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss'
})
export class ConfirmationDialog {

  dialogService = inject(DialogService);

  openDialogConfirmation() {
  const dynamicFormData: DynamicFormData = {
    formGroup: new FormGroup({
      startDate: new FormControl<Date | null>(null, Validators.required),
      option: new FormControl<string | null>(null, Validators.required),
    }),
    inputsMap: {
      startDate: {
        inputId: 'startDate',
        label: 'Start Date',
        fieldType: FormFieldTypeEnum.DATE_PICKER,
        rowSize: 'full',
        showIcon: true,
      },
      option: {
        inputId: 'option',
        label: 'Choose Option',
        fieldType: FormFieldTypeEnum.SELECT_BUTTON,
        rowSize: 'full',
        selectButtonOptions: [
          { label: 'Option A', value: 'A' },
          { label: 'Option B', value: 'B' },
          { label: 'Option C', value: 'C' },
        ],
      },
    },
    formValidationErrorsKeys: ['required']

  };

  const ref = this.dialogService.open(ConfirmationDialogComponent, {
    width: '600px',
    closable: false,
    data: {
      // Header section
      header: 'Confirm Save',
      headerIcon: 'pi pi-exclamation-triangle text-yellow-500',

      // Body
      message: 'Are you sure you want to save this board?',
      dialogIcon: 'pi pi-info-circle text-blue-500 text-lg',
      hint: 'This action cannot be undone.',

      // Labels
      confirmLabel: 'Save Now',
      closeLabel: 'Cancel',

      // Confirm button customizations
      confirmBtnIcon: 'pi pi-check',
      confirmBtnPosition: 'left',
      confirmBtnStyle: 'success',

      // Dynamic form
      inputForm: dynamicFormData,
    },
  });

  ref.onClose.subscribe((res) => {
    if (res?.submitted) {
      console.log('Submitted form data:', res.data);
    } else if (res === true) {
      console.log('Confirmed without form');
    } else {
      console.log('Dialog closed');
    }
  });
}


}
