import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppBreadcrumbComponent,
  AppButtonComponent,
  DynamicSidebarService,
  InputComponent,
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
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo-app');

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
  inputControl: FormControl<any> = new FormControl();
  form: FormGroup = new FormGroup({
    inputControl: this.inputControl,
  });
  value2: any;

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
