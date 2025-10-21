import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { BreadcrumbItem } from '../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';
import { SideBar } from './side-bar/side-bar';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from './../../../ui-components-lib/src/lib/confirmation-dialog/confirmation-dialog.component';

import { SidebarConfig, SidebarConfigDefaults } from './../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';
import { InputComponent } from './../../../ui-components-lib/src/lib/form-components/components/input/input.component';
import { SelectComponent } from './../../../ui-components-lib/src/lib/form-components/components/select/select.component';
import { DynamicSidebarService } from './../../../ui-components-lib/src/lib/side-bar-dynamic/dynamic-sidebar.service';
import { DatePickerComponent } from './../../../ui-components-lib/src/lib/form-components/components/date-picker/date-picker.component';
import { AppButtonComponent, AppBreadcrumbComponent } from '@corp-products/ui-components';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBreadcrumbComponent, InputComponent, ReactiveFormsModule, SelectComponent, DatePickerComponent, AppButtonComponent, AppButtonComponent],
  providers: [DialogService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly title = signal('demo-app');

  form2: FormGroup = new FormGroup({
    search: new FormControl('')
  });;
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
  inputControl: FormControl<any> = new FormControl('' , [Validators.required]);
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
        message: 'سيتم حذف هذه الجهة نهائيًا ولن تكون متاحة في أي معاملات لاحقة. لن تتأثر المعاملات السابقة بهذا الإجراء. لا يمكن التراجع عن الحذف.',
        confirmBtnClasses: 'w-[160px] h-[48px] rounded-lg border border-[#F44336] text-[#F44336] font-bold text-[16px] hover:bg-[#FFF5F5] transition',
        cancelBtnClasses: 'w-[160px] h-[48px] rounded-lg border border-[#F44336] text-[#F44336] font-bold text-[16px] hover:bg-[#FFF5F5] transition',
        headerIcon: 'icon-close',
        defaultIconBGColor: '#FFFBEA',
        confirmBtnStyle: 'min-w-[140px]',
        defaultIcon: '',
        cancelBtnLabel: 'تراجع',
        confirmBtnLabel: 'تاكيد الحذف'
      },
      style: { 'max-width': '550px', width: '100%' ,'display': 'flex', 'justify-content': 'center', 'align-item': 'center' },
      styleClass: 'no-default-header max-w-[550px] w-full',
      header: '',
      showHeader: false,
      closable: false

    });
    ref.onClose.subscribe((res) => {
      console.log(res);
    });
  }


  openSideBar() {
    this.openDialogConfirmation()
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
  }
}
