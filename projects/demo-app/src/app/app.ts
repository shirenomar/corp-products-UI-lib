import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppBreadcrumbComponent, AppButtonComponent, DynamicSidebarService } from '@corp-products/ui-components';
import { BreadcrumbItem } from '../../../ui-components-lib/src/lib/app-breadcrumb/app-breadcrumb.interface';
import { SideBar } from './side-bar/side-bar';
import { SidebarConfig, SidebarConfigDefaults } from '../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from './../../../ui-components-lib/src/lib/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBreadcrumbComponent, AppButtonComponent],
  providers: [DialogService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo-app');

  dialogService = inject(DialogService);
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

  openDialogConfirmation() {
    const ref = this.dialogService.open(ConfirmationDialogComponent, {
      data: {
        header: 'هل تريد حذف الجهة؟',
        message: 'سيتم حذف هذه الجهة نهائيًا ولن تكون متاحة في أي معاملات لاحقة. لن تتأثر المعاملات السابقة بهذا الإجراء. لا يمكن التراجع عن الحذف.',
        confirmBtnClasses: 'w-[160px] h-[48px] rounded-lg border border-[#F44336] text-[#F44336] font-bold text-[16px] hover:bg-[#FFF5F5] transition',
        cancelBtnClasses: 'w-[160px] h-[48px] rounded-lg border border-[#F44336] text-[#F44336] font-bold text-[16px] hover:bg-[#FFF5F5] transition',

      },
      style: { 'max-width': '550px', width: '100%' },
      styleClass: 'no-default-header max-w-[550px] w-full',
      header: '',
      closable: false,
      dismissableMask: true,

    });
    ref.onClose.subscribe((res) => {
      console.log(res);
    });
  }


  openSideBar() {
    this.openDialogConfirmation()
    // this.sidebarDynamicService.open(
    //   SideBar,
    //   {
    //     ...this.sideBarData,
    //     title: 'Activity Log',
    //     showSaveAndMoreBtn: false,
    //     showSaveBtn: false,
    //     showCancelBtn: false
    //   },

    // );
  }

}
