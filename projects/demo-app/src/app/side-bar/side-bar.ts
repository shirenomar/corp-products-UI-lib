import { Component, inject } from '@angular/core';
import { DynamicSidebarService } from '@corp-products/ui-components';
import { SidebarConfig, SidebarConfigDefaults } from '../../../../ui-components-lib/src/lib/side-bar-dynamic/sidebar-config';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {

  sidebarDynamicService = inject(DynamicSidebarService);

  sideBarData: SidebarConfig = SidebarConfigDefaults;


   openSideBar() {
    this.sidebarDynamicService.open(
      SideBar,
      {
        ...this.sideBarData,
        title: 'Activity Log',
        showSaveAndMoreBtn: false,
        showSaveBtn : false,
        showCancelBtn : false
      },

    );
  }

}
