import {Params} from "@angular/router";
import {AppButtonIconPos} from "../app-button";

export interface DropdownMenuItem {
  title: string;
  routerLink?: string;
  queryParams?: Params;
  callback?: () => void;
  icon?: string;
  show?: boolean;
  // TODO: add type
  permissionKey?: string;
  permissionAction?: string;
  iconPosition?: AppButtonIconPos;
  textColor?: DropdownTextColor;
}
export type DropdownTextColor = 'white' | 'purple' | 'green';
