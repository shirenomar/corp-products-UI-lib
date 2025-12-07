import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
import { ConfirmationDialogService } from '@corp-products/ui-components';
import { DialogService } from 'primeng/dynamicdialog';
import { CalenderComponent } from './../calender/calender.component';

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
    CalenderComponent,
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
  @Output() hijriDate = new EventEmitter<boolean>();

  dialogService = inject(DialogService);
  confirmationDialogService = inject(ConfirmationDialogService);
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
  onChangeTry(inputName: string, event: any) {
    console.log("inputName", inputName, 'event', event)
  }
  openHirjiDate() {
    console.log('open hijri');
    this.openConfirmWithForm()
    this.hijriDate.emit(true)

  }
  dynamicFormGroup = new FormGroup({
  });
  dynamicInputsMap: InputsMap = {

    hijriDate: {
      label: 'Hijri Date',
      fieldType: FormFieldTypeEnum.HIJRI_DATE_PICKER,
       rowSize: 'half',
    },
  }
  dialogDynamicFormData: DynamicFormData = {
    formGroup: this.dynamicFormGroup,
    inputsMap: this.dynamicInputsMap,
    title: 'Confirm Action',
    isReadOnlyForm: false,
  };

  openConfirmWithForm() {
    // this.confirmationDialogService
    //   .open({
    //     header: 'Confirm Action',
    //     message: 'Please review and provide the required details to confirm.',
    //     hint: 'All fields are mandatory unless specified otherwise.',
    //     confirmBtnLabel: 'Confirm',
    //     cancelBtnLabel: 'Cancel',
    //     confirmBtnId: 'confirm-with-form',
    //     cancelBtnId: 'cancel-with-form',

    //     inputForm: this.dialogDynamicFormData,
    //   })
    //   .subscribe((confirmed) => {
    //     if (confirmed) {
    //       console.log('✅ Dialog confirmed with form data:');
    //     } else {
    //       console.log('❌ Dialog canceled');
    //     }
    //   });

    const ref = this.dialogService.open(CalenderComponent, {
        data: {
          header: 'هل تريد حذف الجهة؟',
          message: 'لن يتم حفظ أي تغييرات قمت بها على هذا الصف.',
          mainIcon: 'icon-delete',
          cancelBtnLabel: 'تراجع',
          confirmBtnLabel: 'تاكيد الحذف'
        },
        style: { 'max-width': '550px', width: '100%' },
        header: '',
      });
      ref?.onClose.subscribe((res) => {
        console.log(res);
      });

  }

}
