import { Type, ViewContainerRef } from "@angular/core";
import { AppButtonIconPos, AppButtonSeverity, AppButtonSize, AppButtonVariant } from "../app-button";

export interface DynamicSidebarActions {
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
  actions?: SidebarActions
}

export interface SidebarActionConfig {
  title?: string;
  icon?: string;
  size?: AppButtonSize;
  style?: AppButtonSeverity;
  iconPos?: AppButtonIconPos;
  variant?: AppButtonVariant;
}

export interface SidebarActions {
  cancel?: SidebarActionConfig;
  save?: SidebarActionConfig;
}
