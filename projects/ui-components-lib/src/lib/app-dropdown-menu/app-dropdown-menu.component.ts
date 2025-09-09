import {Component, inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { AppButtonComponent } from '../app-button';
import { Popover } from 'primeng/popover';
import { DropdownMenuItem } from './app-dropdown-menu';
import {Router} from '@angular/router';
import {AppButtonIconPos, AppButtonSeverity} from '../app-button';
import { TranslateModule } from '@ngx-translate/core';
import {NgClass} from "@angular/common";
import {MenuPopupTextColorPipe} from "./menu-popup.pipe";

@Component({
  selector: "app-dropdown-menu",
  standalone: true,
  imports: [AppButtonComponent, Popover, TranslateModule, NgClass, MenuPopupTextColorPipe],
  templateUrl: "./app-dropdown-menu.component.html",
  styleUrl: "./app-dropdown-menu.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class AppDropdownMenuComponent implements OnInit {
  @Input({ required: true }) buttonTitle: string;
  @Input({ required: true }) menuItems: DropdownMenuItem[] = [];
  @Input() popupMenuStyle: "white" | "purple" = "purple";
  @Input() buttonIcon = "font-icon-plus";
  @Input() buttonClass: string;
  @Input() buttonStyle: AppButtonSeverity;
  @Input() buttonIconPosition: AppButtonIconPos = "left";
  router = inject(Router);

  showMenu: boolean;

  ngOnInit() {
    this.showMenu = this.menuItems.some((item) => {
      return item.show;
    });
  }
  onMenuItemClick(item: DropdownMenuItem): void {
    if (item.callback) {
      item.callback();
    } else if (item.routerLink) {
      this.router.navigate(Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink], { queryParams: item.queryParams || {} });
    }
  }
}
