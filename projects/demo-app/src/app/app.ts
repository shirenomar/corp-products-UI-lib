import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppBreadcrumbComponent, AppButtonComponent, DynamicSidebarService } from '@corp-products/ui-components';
import { BreadcrumbItem } from '../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';
import { SideBar } from './side-bar/side-bar';
import { SidebarConfig, SidebarConfigDefaults } from '../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , AppBreadcrumbComponent , AppButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
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



  openSideBar() {
    this.sidebarDynamicService.open(
      SideBar,
      {
        ...this.sideBarData,
        title: 'Activity Log',
        showSaveAndMoreBtn: true
      },

    );
  }

}
