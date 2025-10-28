import { Type, ViewContainerRef } from "@angular/core";

export interface DynamicSidebarActions {
  submit: () => void;
  close: () => void;
}
export interface DynamicSidebarConfig<T = any> {
  title?: string;
  component: Type<T>;
  data?: Partial<T>;
  actionName?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right';
  styleClass?: string;
  viewContainerRef?: ViewContainerRef;
}
