import { ApplicationRef, ComponentRef, createComponent, EmbeddedViewRef, EnvironmentInjector, Injectable, Type } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { SideBarDynamicComponent } from "./side-bar-dynamic.component";
import { SidebarConfig, SidebarConfigDefaults } from "./sidebar-config";
import { SidebarActionEvent, SidebarActionType } from "./side-bar-utils";

@Injectable({
  providedIn: "root"
})
export class DynamicSidebarService {
  contentComponentRef: Type<any> | null = null;
  contentComponentData: unknown;
  sidebarConfig: SidebarConfig = this.getDefaultConfig();
  activeForm: AbstractControl | null = null;
  private componentRef: ComponentRef<SideBarDynamicComponent> | null = null;
  private sidebarAction$ = new Subject<SidebarActionEvent>();
  action$ = this.sidebarAction$.asObservable();
  private sidebarSideEffectAction$ = new Subject<SidebarActionEvent>();
  sideEffectAction$ = this.sidebarSideEffectAction$.asObservable();
  private isOpen$ = new BehaviorSubject<boolean>(false);
  isOpenObservable$ = this.isOpen$.asObservable();

  constructor(private environmentInjector: EnvironmentInjector, private appRef: ApplicationRef) {}

// Action notifications
  notifyAction(type: SidebarActionType, payload?: any): void {
    this.sidebarAction$.next({type, payload});
  }

  notifySideEffectAction(type: SidebarActionType, payload?: any): void {
    this.sidebarSideEffectAction$.next({type, payload});
  }

  // Form management
  setActiveForm(control: AbstractControl): void {
    this.activeForm = control;
  }

  resetActiveForm(): void {
    this.activeForm = null;
  }

  isButtonDisabled(): boolean {
    if (!this.activeForm) {
      return false;
    }
    return this.activeForm.invalid || this.activeForm.untouched;
  }

  open(component: unknown, config: SidebarConfig, data?: any): void {
    // Close any existing sidebar before opening a new one
    // TODO Need to Review
    if (!component) {
      return;
    }

    this.close();
    this.contentComponentRef = component as Type<any>;
    this.contentComponentData = data;
    this.sidebarConfig = {...this.getDefaultConfig(), ...config};

    this.componentRef = createComponent(SideBarDynamicComponent, {
      environmentInjector: this.environmentInjector,
    });
    // Attach the component to the Angular application
    this.appRef.attachView(this.componentRef.hostView);

    // Append the component to the DOM
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  /**
   * Closes the currently open sidebar, if any.
   */
  close(): void {
    if (this.componentRef) {
      // Detach the view and destroy the component
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;

      // Reset content and configuration
      this.contentComponentRef = null;
      this.contentComponentData = null;
      this.sidebarConfig = this.getDefaultConfig();
      this.isOpen$.next(false);
      this.resetActiveForm();
      this.notifySideEffectAction(SidebarActionType.CLOSE);
    }
  }

  cancel(): void {
    this.notifyAction(SidebarActionType.CANCEL);
  }

  submit(flag: boolean = false): void {
    const actionType = flag ? SidebarActionType.SaveMore : SidebarActionType.SAVE;
    this.notifyAction(actionType, {withClose: flag});
  }

  /**
   * Provides the default configuration for the sidebar.
   * @returns The default SidebarConfig object.
   */
  private getDefaultConfig(): SidebarConfig {
    return {
      ...SidebarConfigDefaults,
      show: false,
      visible: false,
      closable: false,
      dismissible: true
    };
  }
}
