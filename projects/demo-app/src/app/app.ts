import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { BreadcrumbItem } from '../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';
import { SideBar } from './side-bar/side-bar';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogService } from './../../../ui-components-lib/src/lib/confirmation-dialog/confirmation-dialog.service';

import { SidebarConfig, SidebarConfigDefaults } from './../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';
import { InputComponent } from './../../../ui-components-lib/src/lib/form-components/components/input/input.component';
import { SelectComponent } from './../../../ui-components-lib/src/lib/form-components/components/select/select.component';
import { DynamicSidebarService } from './../../../ui-components-lib/src/lib/side-bar-dynamic/dynamic-sidebar.service';
import { DatePickerComponent } from './../../../ui-components-lib/src/lib/form-components/components/date-picker/date-picker.component';
import { AppButtonComponent, AppBreadcrumbComponent, BottomSheetComponent, BottomSheetService } from '@corp-products/ui-components';
import { ConfirmationDialogComponent } from './../../../ui-components-lib/src/lib/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBreadcrumbComponent, InputComponent, ReactiveFormsModule, SelectComponent, DatePickerComponent, AppButtonComponent, AppButtonComponent , BottomSheetComponent],
  providers: [DialogService, ConfirmationDialogService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  show = false;
  protected readonly title = signal('demo-app');

  form2: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  confirmationDialogService = inject(ConfirmationDialogService)
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
  bottomSheetService = inject(BottomSheetService);

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

  openDialogConfirmation() {
    const ref = this.dialogService.open(ConfirmationDialogComponent, {
      data: {


        header: 'هل تريد حذف الجهة؟',
        message: 'لن يتم حفظ أي تغييرات قمت بها على هذا الصف.',
        mainIcon: 'icon-delete',
        cancelBtnLabel: 'تراجع',
        confirmBtnLabel: 'تاكيد الحذف'
      },
      style: { 'max-width': '550px', width: '100%' },
      header: '',
      showHeader: false,
      closable: false,
    });
    ref.onClose.subscribe((res) => {
      console.log(res);
    });
  }


  openSideBar() {
    // this.openDialogConfirmation()
    this.sidebarDynamicService.open(
      SideBar,
      {
        ...this.sideBarData,
        title: 'Activity Log',
        showSaveAndMoreBtn: false,
        showSaveBtn: false,
        showCancelBtn: false
      },

    );
      this.confirmationDialogService.open({
      header: 'هل تريد حذف الجهة؟',
      message:
        'سيتم حذف هذه الجهة نهائيًا ولن تكون متاحة في أي معاملات لاحقة. لن تتأثر المعاملات السابقة بهذا الإجراء. لا يمكن التراجع عن الحذف.',
      mainIcon: 'icon-delete',
        confirmBtnId : 'confirm-id',
    cancelBtnId : 'cancel-id',
      cancelBtnLabel: 'تراجع',
      confirmBtnLabel: 'تأكيد الحذف'
    }).subscribe((confirmed) => {
      if (confirmed) {
        console.log('✅ User confirmed deletion');
        // perform delete logic
      } else {
        console.log('❌ User canceled');
      }
    });

  }

  showButtomSheet(){
    this.bottomSheetService.open(App);
  }

   showButtomSheet2(){
    this.bottomSheetService.open(SideBar);
  }

  hidebottomSheet(){
    this.bottomSheetService.hide();
  }
}
