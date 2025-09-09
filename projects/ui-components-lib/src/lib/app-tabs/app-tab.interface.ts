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
export interface TemplateTab extends Tab {
  contentTemplate: TemplateRef<unknown>;
}


export type AppTabs = ({
  isRouted: true;
  items: RoutedTab[];
} | {
  isRouted: false;
  items: TemplateTab[];
})
