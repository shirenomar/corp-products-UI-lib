import { MenuItem } from 'primeng/api';

export interface BreadcrumbItem {
  isShownBreadcrumb?: boolean;
  notClickable: boolean;
  label: string;
  routerLink: string;
  isShown: boolean;
  extraBreadcrumbs?: BreadCrumbExtraData[];
}

export interface BreadCrumbPosition {
  position: 'before' | 'after';
}

export type BreadCrumbExtraData = MenuItem & BreadCrumbPosition;
