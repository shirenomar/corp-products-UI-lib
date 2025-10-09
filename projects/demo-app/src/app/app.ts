import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppBreadcrumbComponent,
  AppButtonComponent,
  DatePickerComponent,
  DynamicSidebarService,
  InputComponent,
  SelectComponent,
} from '@corp-products/ui-components';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { BreadcrumbItem } from '../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';
import {
  SidebarConfig,
  SidebarConfigDefaults,
} from '../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';
import { SideBar } from './side-bar/side-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AppBreadcrumbComponent,
    AppButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    FloatLabelModule,
    InputText,
    FormsModule,
    DatePickerComponent,
    SelectComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly title = signal('demo-app');

  items: BreadcrumbItem[] = [
    {
      notClickableBreadcrumb: false,
      label: 'Home',
      routerLink: '/home',
      isShownBreadcrumb: true,
    },
    {
      notClickableBreadcrumb: false,
      label: 'Products',
      routerLink: '/products',
      isShownBreadcrumb: true,
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
      notClickableBreadcrumb: true,
      label: 'Electronics',
      routerLink: '/products/electronics',
      isShownBreadcrumb: true,
    },
    {
      notClickableBreadcrumb: false,
      label: 'Laptops',
      routerLink: '/products/electronics/laptops',
      isShownBreadcrumb: true,
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
      notClickableBreadcrumb: false,
      label: 'Gaming Laptop',
      routerLink: '/products/electronics/laptops/gaming',
      isShownBreadcrumb: true,
    },
  ];

  sidebarDynamicService = inject(DynamicSidebarService);

  sideBarData: SidebarConfig = SidebarConfigDefaults;
  dateControl: FormControl<any> = new FormControl({ value: null, disabled: false }, []);
  inputControl: FormControl<any> = new FormControl();
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

  openSideBar() {
    this.sidebarDynamicService.open(SideBar, {
      ...this.sideBarData,
      title: 'Activity Log',
      showSaveAndMoreBtn: false,
      showSaveBtn: false,
      showCancelBtn: false,
    });
  }

  ngOnInit() {
    // this.inputControl.setValue('hello');
    // this.form.get('inputControl')?.setValue('hello');
  }
}
