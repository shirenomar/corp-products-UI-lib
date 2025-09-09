import {MenuItem} from "primeng/api";

export interface BreadcrumbItem {
  notClickableBreadcrumb: boolean;
  label: string;
  routerLink: string;
  isShownBreadcrumb: boolean;
  extraBreadcrumbs?: BreadCrumbExtraData[];
}

export interface BreadCrumbPosition {
  position: 'before' | 'after'
}

export type BreadCrumbExtraData = MenuItem & BreadCrumbPosition;
