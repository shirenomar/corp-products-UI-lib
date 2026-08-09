import { NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from "@angular/core";
import { Drawer } from "primeng/drawer";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-bottom-sheet",
  standalone: true,
  imports: [Drawer, NgClass, NgTemplateOutlet, TooltipModule],
  templateUrl: "./bottom-sheet.component.html",
  styleUrl: "./bottom-sheet.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class BottomSheetComponent {
  @Input() show = false;
  @Input() contentTemplate!: TemplateRef<unknown>;

  @Output() onHide = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<boolean>();

  hideBottomSheet() {
    this.show = false;
    this.onHide.emit(false);
  }
}
