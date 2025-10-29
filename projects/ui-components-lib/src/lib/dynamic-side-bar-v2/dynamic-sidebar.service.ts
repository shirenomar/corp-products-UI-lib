import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, Injector, createComponent, inject } from '@angular/core';
import { DynamicSidebarComponent } from './dynamic-sidebar.component';
import { DynamicSidebarConfig } from './dynamic-sidebar.config';

@Injectable({ providedIn: 'root' })
export class DynamicSidebarV2Service {
  private sidebarRef?: ComponentRef<DynamicSidebarComponent>;
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly envInjector = inject(EnvironmentInjector);

  open<T>(options: DynamicSidebarConfig<T>) {
    this.close();

    this.sidebarRef = createComponent(DynamicSidebarComponent, {
      environmentInjector: this.envInjector,
      elementInjector: this.injector,
    });

    const instance = this.sidebarRef.instance;
    instance.title = options.title ?? '';
    instance.sidebarSize = options.size ?? 'md';
    instance.position = options.position ?? 'left';
    instance.styleClass = options.styleClass ?? '';
    instance.component = options.component;
    instance.data = options.data ?? {};
    instance.actionName = options.actionName;
    instance.closed.subscribe(() => this.close());

    this.appRef.attachView(this.sidebarRef.hostView);
    const domElem = (this.sidebarRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  close() {
    if (this.sidebarRef) {
      this.sidebarRef.destroy();
      this.sidebarRef = undefined;
    }
  }
}
