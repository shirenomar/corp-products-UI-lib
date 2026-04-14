import { Type, ViewContainerRef } from "@angular/core";
import { AppButtonIconPos, AppButtonSeverity, AppButtonSize, AppButtonVariant } from "../app-button";

export interface DynamicSidebarV2Actions {
  submit: () => void;
  close: () => void;
}
export interface DynamicSidebarV2Config<T = any> {
  title?: string;
  component: Type<T>;
  data?: Partial<T>;
  size?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right';
  styleClass?: string;
  viewContainerRef?: ViewContainerRef;
  actions?: SidebarV2Actions;
  hideActions?: boolean;
}

export interface SidebarActionV2Config {
  title?: string;
  icon?: string;
  size?: AppButtonSize;
  style?: AppButtonSeverity;
  iconPos?: AppButtonIconPos;
  variant?: AppButtonVariant;
}

export interface SidebarV2Actions {
  cancel?: SidebarActionV2Config;
  save?: SidebarActionV2Config;
}
