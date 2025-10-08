import { MenuItem } from 'primeng/api';

export interface BreadcrumbItem {
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
