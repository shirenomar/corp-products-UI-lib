import { Component } from '@angular/core';
import { AppBreadcrumbComponent } from '@corp-products/ui-components';
import { BreadcrumbItem } from '../../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  imports: [AppBreadcrumbComponent],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {

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
}
