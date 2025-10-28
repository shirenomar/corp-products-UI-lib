import { Type, ViewContainerRef } from "@angular/core";

export interface IDynamicSidebarActions {
  submit: () => void;
  close: () => void;
}
export interface DynamicSidebarConfig<T = any> {
  title?: string;
  component: Type<T>;
  data?: Partial<T>;
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right';
  styleClass?: string;
  viewContainerRef?: ViewContainerRef;
}
