import { NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { PrimeTemplate } from "primeng/api";
import { Drawer } from "primeng/drawer";
import { TooltipModule } from "primeng/tooltip";
import { BottomSheetService } from "./bottom-sheet.service";

@Component({
  selector: "app-bottom-sheet",
  standalone: true,
  imports: [PrimeTemplate, Drawer, NgClass, NgTemplateOutlet, TooltipModule],
  templateUrl: "./bottom-sheet.component.html",
  styleUrl: "./bottom-sheet.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class BottomSheetComponent implements OnInit {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer!: ViewContainerRef;

  @Input() show = false;
  @Input() contentTemplate!: TemplateRef<unknown>;

  @Output() onHide = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<boolean>();

  private bottomSheetService = inject(BottomSheetService);

  ngOnInit(): void {
    this.bottomSheetService.register(this);
  }

   hideBottomSheet() {
    alert("hide")
    this.show = false;
    this.onHide.emit(false);

  }

  open<T>(component: Type<T>) {
    this.dynamicContainer.clear();
    const componentRef = this.dynamicContainer.createComponent(component);
    this.show = true;
    return componentRef;
  }
}
