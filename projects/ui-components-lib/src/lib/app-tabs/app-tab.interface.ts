import { TemplateRef } from "@angular/core";

interface Tab {
  title: string;
  iconName?: string;
  iconPathCount?: number;
  disabled?: boolean;
  count?: number;
  permissionKey?: string;
}

export interface RoutedTab extends Tab {
  link: string;
}
export interface TemplateTab<T = unknown> extends Tab {
  contentTemplate: TemplateRef<unknown>;
  queryParamValue?: T;
}


export type AppTabs = ({
  key? : unknown;
  isRouted: true;
  items: RoutedTab[];
} | {
  key? : unknown;
  isRouted: false;
  items: TemplateTab[];
})
