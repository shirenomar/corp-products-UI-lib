import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { TranslatePipe } from "@ngx-translate/core";
import { AppButtonComponent } from "../app-button";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrl: "./app-header.component.scss",
  standalone: true,
  imports: [RouterModule, AppButtonComponent, Menu, TranslatePipe],
  encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent {
  @Output() createButtonClicked = new EventEmitter();
  @Output() toggleMenu = new EventEmitter<boolean>();
  //@Input() userInfo: UserInfo;
  items: MenuItem[] | undefined = [
    {
      items: [
        {
          label: "خــــروج",
          command: () => this.logout()
        }
      ]
    }
  ];
  // UserPermissionsEnum = UserPermissionsEnum;
  // PermissionsActions = PermissionsActions;

  logout(): void {
    // this.authService
    //   .logoutFromSSO()
    //   .pipe(
    //     finalize(() => {
    //       this.authService.clearAuth();
    //     })
    //   )
    //   .subscribe();
  }
}
