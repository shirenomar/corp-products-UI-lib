import { Component, inject, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SideMenuItem } from "./side-menu";
import { BASE_SIDE_MENU_ITEMS } from "./side-menu-items";
import { NgClass } from "@angular/common";
@Component({
  selector: "app-side-menu",
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: "./app-side-menu.component.html",
  encapsulation: ViewEncapsulation.None
})
export class AppSideMenuComponent implements OnInit {
  @Input() isOpen!: boolean;
  menuItems: SideMenuItem[] = BASE_SIDE_MENU_ITEMS;
  //permissionsService = inject(PermissionsService);
  filteredMenu: SideMenuItem[];

  ngOnInit(): void {
    this.filteredMenu = this.menuItems.filter((item) => {
      if (!item.permissionKey) {
        return true;
      }
      //  return this.permissionsService.checkKeyHasPermission(item.permissionKey as UserPermissionsEnum, PermissionsActions.VIEW);
      return;
    });
  }
}
