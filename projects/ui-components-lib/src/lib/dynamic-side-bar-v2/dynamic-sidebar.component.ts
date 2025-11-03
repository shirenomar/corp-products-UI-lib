import { AppButtonComponent } from './../app-button/app-button.component';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DrawerModule } from 'primeng/drawer';
import { TooltipModule } from "primeng/tooltip";
import { SidebarV2Actions } from './dynamic-sidebar.config';

@Component({
  selector: "app-dynamic-sidebar",
  templateUrl: "./dynamic-sidebar.component.html",
  styleUrls: ["./dynamic-sidebar.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslatePipe, DrawerModule, TooltipModule, AppButtonComponent],
})
export class DynamicSidebarComponent implements AfterViewInit, OnDestroy {

  @Input() component!: Type<any>;
  @Input() data?: any;
  @Input() title = '';
  @Input() actions?: SidebarV2Actions;
  @Input() sidebarSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() closable = true;
  @Input() closeOnEscape = true;
  @Input() dismissible = true;
  @Input() position: 'left' | 'right' = 'left';
  @Input() styleClass = '';
  @Input() disabled = false;

  @Output() closed = new EventEmitter();

  @ViewChild('contentContainer', { read: ViewContainerRef })
  private contentContainer!: ViewContainerRef;

  private contentRef: any;

  show = true;

  ngAfterViewInit() {
    this.renderContent();
  }

  private renderContent() {
    if (!this.component) return;
    this.contentContainer.clear();
    this.contentRef = this.contentContainer.createComponent(this.component);
    if (this.data) Object.assign(this.contentRef.instance, this.data);
  }

  handleClose() {
    if(this.contentRef.instance.close) this.contentRef.instance.close();
    this.closed.emit(null);
    this.destroy();
  }

  handleSubmit() {
    if(this.data.form) {
      this.data.form.markAllAsTouched();
      if(this.data.form.invalid) return;
    }
    if(this.contentRef.instance.submit) this.contentRef.instance.submit();
  }

  private destroy() {
    this.contentRef?.destroy();
  }

  ngOnDestroy() {
    this.destroy();
  }
}
