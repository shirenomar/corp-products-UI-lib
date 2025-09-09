import {NgClass, NgComponentOutlet} from "@angular/common";
import {Component, inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {AppButtonComponent} from "@ui-components";
import {DataInjectorPipe} from "libs/ui-components/src/lib/side-bar-dynamic/data-injector.pipe";
import {DynamicSidebarService} from "libs/ui-components/src/lib/side-bar-dynamic/dynamic-sidebar.service";
import {createCustomInjector, SIDEBAR_DATA} from "libs/ui-components/src/lib/side-bar-dynamic/side-bar-utils";
import {PrimeTemplate} from "primeng/api";
import {Drawer} from "primeng/drawer";
import { Location } from '@angular/common';
import {TranslatePipe} from "@ngx-translate/core";
@Component({
  selector: "app-side-bar-dynamic",
  templateUrl: "./side-bar-dynamic.component.html",
  styleUrls: ["./side-bar-dynamic.component.scss"],
  standalone: true,
  imports: [Drawer, NgClass, NgComponentOutlet, PrimeTemplate, DataInjectorPipe, AppButtonComponent, TranslatePipe]
})
export class SideBarDynamicComponent implements OnInit, OnDestroy {
  dynamicSidebarService = inject(DynamicSidebarService);
  parentInjector = inject(Injector);
  location = inject(Location);
  private popStateListener: any;
  sidebarConfig = this.dynamicSidebarService.sidebarConfig;
  ngOnInit() {
    //To close a sidebar when the browser back button is pressed
    this.popStateListener = this.location.subscribe(() => {
      if (this.dynamicSidebarService.sidebarConfig.visible) {
        this.dynamicSidebarService.close();
      }
    });
  }

  ngOnDestroy() {
    // reset Sidebar token
    createCustomInjector(this.parentInjector, SIDEBAR_DATA, null);
  }
}
