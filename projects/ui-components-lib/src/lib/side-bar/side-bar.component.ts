import { NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from "@angular/core";
import { Drawer } from "primeng/drawer";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-side-bar",
  standalone: true,
  imports: [Drawer, NgClass, NgTemplateOutlet, TooltipModule],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class SideBarComponent {
  @Input() show = false;
  @Input() title: string;
  @Input() closable = true;
  @Input() dismissible = false;
  @Input() closeOnEscape = false;
  @Input() sidebarSize: "sm" | "md" | "lg" | "xl" = "sm";
  @Input() styleClass = "";
  @Output() hide = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<boolean>();
  @Input() contentTemplate!: TemplateRef<unknown>;
  @Input() footerTemplate!: TemplateRef<unknown>;
  @Input() position  = 'left';

  hideSidebar() {
    this.show = false;
    this.hide.emit(false);
  }
}
