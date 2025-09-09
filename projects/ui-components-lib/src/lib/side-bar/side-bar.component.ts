import { NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from "@angular/core";
import { PrimeTemplate } from "primeng/api";
import { Drawer } from "primeng/drawer";

@Component({
  selector: "app-side-bar",
  standalone: true,
  imports: [PrimeTemplate, Drawer, NgClass, NgTemplateOutlet],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent {
  @Input() show = false;
  @Input() title: string;
  @Input() closable = false;
  @Input() dismissible = false;
  @Input() closeOnEscape = false;
  @Input() sidebarSize: "sm" | "md" | "lg" | "xl" = "sm";
  @Input() styleClass = "";
  @Output() hide = new EventEmitter<boolean>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onShow = new EventEmitter<boolean>();
  @Input() contentTemplate!: TemplateRef<unknown>;
  @Input() footerTemplate!: TemplateRef<unknown>;

  hideSidebar() {
    this.show = false;
    this.hide.emit(false);
  }
}
