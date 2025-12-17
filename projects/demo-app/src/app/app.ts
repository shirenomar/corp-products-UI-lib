import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DialogService } from 'primeng/dynamicdialog';
import { BreadcrumbItem } from '../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';
import { ConfirmationDialogService } from './../../../ui-components-lib/src/lib/confirmation-dialog/confirmation-dialog.service';
import { SideBar } from './side-bar/side-bar';

import {
  AppBreadcrumbComponent,
  AppButtonComponent,
  BottomSheetComponent,
  DynamicFormComponent,
  DynamicFormData,
  FormFieldTypeEnum,
  InputsMap,
} from '@corp-products/ui-components';
import { ConfirmationDialogComponent } from './../../../ui-components-lib/src/lib/confirmation-dialog/confirmation-dialog.component';
import { DynamicSidebarService } from './../../../ui-components-lib/src/lib/side-bar-dynamic/dynamic-sidebar.service';
import {
  SidebarConfig,
  SidebarConfigDefaults,
} from './../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';
import { SelectComponent } from './../../../ui-components-lib/src/lib/form-components/components/select/select.component';
@Component({
  selector: 'app-root',
  imports: [
AppBreadcrumbComponent,
    ReactiveFormsModule,
    AppButtonComponent,
    BottomSheetComponent,
    DynamicFormComponent,
    SelectComponent,
    CommonModule,
  ],
  providers: [DialogService, ConfirmationDialogService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  show = false;
  protected readonly title = signal('demo-app');

  form2: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  confirmationDialogService = inject(ConfirmationDialogService);
  dialogService = inject(DialogService);
  items: BreadcrumbItem[] = [
    {
      notClickable: false,
      label: 'Home',
      routerLink: '/home',
      isShown: true,
    },
    {
      notClickable: false,
      label: 'Products',
      routerLink: '/products',
      isShown: true,
      extraBreadcrumbs: [
        {
          label: 'New Arrivals',
          icon: 'pi pi-star',
          command: () => console.log('Clicked New Arrivals'),
          position: 'after',
        },
      ],
    },
    {
      notClickable: true,
      label: 'Electronics',
      routerLink: '/products/electronics',
      isShown: true,
    },
    {
      notClickable: false,
      label: 'Laptops',
      routerLink: '/products/electronics/laptops',
      isShown: true,
      extraBreadcrumbs: [
        {
          label: 'On Sale',
          icon: 'pi pi-tags',
          url: '/products/electronics/laptops/sale',
          position: 'before',
        },
      ],
    },
    {
      notClickable: false,
      label: 'Gaming Laptop',
      routerLink: '/products/electronics/laptops/gaming',
      isShown: true,
    },
  ];

  sidebarDynamicService = inject(DynamicSidebarService);

  sideBarData: SidebarConfig = SidebarConfigDefaults;
  dateControl: FormControl<any> = new FormControl({ value: null, disabled: false }, []);
  inputControl: FormControl<any> = new FormControl('', [Validators.required]);
  selectControl: FormControl<any> = new FormControl(null, []);
  form: FormGroup = new FormGroup({
    inputControl: this.inputControl,
    dateControl: this.dateControl,
    selectControl: this.selectControl,
  });
  value2: any;
  options = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
    { name: 'Option 3', code: '3' },
    { name: 'Option 4', code: '4' },
    { name: 'Option 5', code: '5' },
  ];
  selectItems = [
    { name: 'Item 1', code: '1' },
    { name: 'Item 2', code: '2' },
    { name: 'Item 3', code: '3' },
    { name: 'Item 4', code: '4' },
    { name: 'Item 5', code: '5' },
  ];

  // Dynamic form demo config and state
  dynamicFormGroup = new FormGroup({
    startDate: new FormControl<Date | null>(new Date(), [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
    hijriDate: new FormControl<Date | null>(null ),

    fullName: new FormControl<string>('', [Validators.required]),
    role: new FormControl<any>(null, [Validators.required]),
    status: new FormControl<string | null>(null),
    notify: new FormControl<boolean>(false),
    assignee: new FormControl<Array<any>>([], [Validators.required]),
  });

  private allUsers = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Prince' },
    { id: 5, name: 'Evan Davis' },
  ];

  dynamicInputsMap: InputsMap = {
    startDate: {
      label: 'Start Date',
      fieldType: FormFieldTypeEnum.DATE_PICKER,
      inputId: 'df-start-date',
      rowSize: 'half',
      dateRange: { min: new Date(2020, 0, 1), max: new Date(2030, 11, 31) },
      showIcon: true,
      variant: 'in',
    },
    hijriDate: {
      label: 'Hijri Date',
      fieldType: FormFieldTypeEnum.HIJRI_DATE_PICKER,
      rowSize: 'half',
      showIcon: true,
    },
    endDate: {
      label: 'End Date',
      fieldType: FormFieldTypeEnum.DATE_PICKER,
      inputId: 'df-end-date',
      rowSize: 'half',
      dateRange: { min: new Date(2020, 0, 1), max: new Date(2030, 11, 31) },
      showIcon: true,
      variant: 'in',
    },
    fullName: {
      label: 'Full Name',
      fieldType: FormFieldTypeEnum.INPUT,
      inputId: 'df-full-name',
      rowSize: 'half',
      inputType: 'text',
      contentType: 'text',
      placeholder: 'Enter your full name',
      variant: 'in',
    },
    role: {
      label: 'Role',
      fieldType: FormFieldTypeEnum.SELECT,
      inputId: 'df-role',
      rowSize: 'half',
      selectOptions: this.selectItems,
      optionLabel: 'name',
      showClear: true,
      filter: false,
      variant: 'in',
    },
    status: {
      label: 'Status',
      fieldType: FormFieldTypeEnum.SELECT_BUTTON,
      inputId: 'df-status',
      rowSize: 'half',
      selectButtonOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    notify: {
      label: 'Email Notifications',
      fieldType: FormFieldTypeEnum.SWITCH,
      inputId: 'df-notify',
      rowSize: 'half',
    },
    assignee: {
      label: 'Assignee',
      fieldType: FormFieldTypeEnum.AUTO_COMPLETE,
      inputId: 'df-assignee',
      rowSize: 'full',
      // autoCompleteItems: this.allUsers,
      variant: 'in',
      placeholder: 'Type to search users',
    },
  };

  dynamicFormData: DynamicFormData = {
    formGroup: this.dynamicFormGroup,
    inputsMap: this.dynamicInputsMap,
    title: 'Dynamic Form Demo',
    isReadOnlyForm: false,
  };

  onDynamicSelectButtonChange(e: { name: string; value: any }) {
    console.log('SelectButton change', e);
  }

  onDynamicSelectChange(e: { name: string; event: any }) {
    console.log('Select change', e);
  }

  onDynamicSwitchChange(e: { name: string; value: boolean }) {
    console.log('Switch change', e);
  }

  onDynamicAutoCompleteSearch(e: { name: string; query: string }) {
    const q = (e.query || '').toLowerCase();
    const results = this.allUsers.filter((u) => u.name.toLowerCase().includes(q));
    // update items for the autocomplete field
    this.dynamicInputsMap[e.name].autoCompleteItems = results;
  }

  onDynamicAutoCompleteSelect(e: { name: string; event: any }) {
    console.log('AutoComplete select', e);
  }

  onSubmitDynamicForm() {
    this.dynamicFormGroup.markAllAsTouched();
    this.dynamicFormGroup.updateValueAndValidity();
    if (this.dynamicFormGroup.invalid) {
      console.warn(
        'Dynamic form invalid',
        this.dynamicFormGroup.errors,
        this.dynamicFormGroup.value
      );
      return;
    }
    console.log('Dynamic form submit', this.dynamicFormGroup.value);
  }

  // ===== Confirmation Dialog with Dynamic Form =====
  dialogFormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    reason: new FormControl<string>('', [Validators.required, Validators.maxLength(500)]),
  });
  addNewGroup(newGroup: string) {
    console.log('newGroup', newGroup);

  }

  dialogInputsMap: InputsMap = {
    // name: {
    //   label: 'Name',
    //   fieldType: FormFieldTypeEnum.INPUT,
    //   inputId: 'dlg-name',
    //   rowSize: 'full',
    //   inputType: 'text',
    //   contentType: 'text',
    //   placeholder: 'Enter name',
    //   variant: 'in',
    // },

    name: {
      label: 'name',
      fieldType: FormFieldTypeEnum.AUTO_COMPLETE,
      inputId: 'df-name',
      rowSize: 'full',
      // autoCompleteItems: this.allUsers,
      placeholder: 'Type to search users',
      variant: 'in',
    },
    reason: {
      label: 'Reason',
      fieldType: FormFieldTypeEnum.AUTO_COMPLETE,
      inputId: 'dlg-reason',
      rowSize: 'full',
      inputType: 'textarea',
      placeholder: 'Please provide a reason for this action',
      variant: 'in',
      rows: 3,
      maxLength: 500,
    },
  };

  dialogDynamicFormData: DynamicFormData = {
    formGroup: this.dynamicFormGroup,
    inputsMap: this.dynamicInputsMap,
    title: 'Confirm Action',
    isReadOnlyForm: false,
  };

  openConfirmWithForm() {
    this.confirmationDialogService
      .open({
        header: 'Confirm Action',
        message: 'Please review and provide the required details to confirm.',
        hint: 'All fields are mandatory unless specified otherwise.',
        confirmBtnLabel: 'Confirm',
        cancelBtnLabel: 'Cancel',
        confirmBtnId: 'confirm-with-form',
        cancelBtnId: 'cancel-with-form',
        inputForm: this.dialogDynamicFormData,
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          console.log('✅ Dialog confirmed with form data:', this.dialogFormGroup.value);
        } else {
          console.log('❌ Dialog canceled');
        }
      });
  }

  openDialogConfirmation() {
    const ref = this.dialogService.open(ConfirmationDialogComponent, {
      data: {
        header: 'هل تريد حذف الجهة؟',
        message: 'لن يتم حفظ أي تغييرات قمت بها على هذا الصف.',
        mainIcon: 'icon-delete',
        cancelBtnLabel: 'تراجع',
        confirmBtnLabel: 'تاكيد الحذف',
      },
      style: { 'max-width': '550px', width: '100%' },
      header: '',
      showHeader: false,
      closable: false,
    });
    ref?.onClose.subscribe((res) => {
      console.log(res);
    });
  }

  openSideBar() {
    // this.openDialogConfirmation()
    this.sidebarDynamicService.open(SideBar, {
      ...this.sideBarData,
      title: 'Activity Log',
      showSaveAndMoreBtn: false,
      showSaveBtn: false,
      showCancelBtn: false,
    });
    this.confirmationDialogService
      .open({
        header: 'هل تريد حذف الجهة؟',
        message:
          'سيتم حذف هذه الجهة نهائيًا ولن تكون متاحة في أي معاملات لاحقة. لن تتأثر المعاملات السابقة بهذا الإجراء. لا يمكن التراجع عن الحذف.',
        confirmBtnId: 'confirm-id',
        cancelBtnId: 'cancel-id',
        cancelBtnLabel: 'تراجع',
        confirmBtnLabel: 'تأكيد الحذف',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          console.log('✅ User confirmed deletion');
          // perform delete logic
        } else {
          console.log('❌ User canceled');
        }
      });
  }
}
