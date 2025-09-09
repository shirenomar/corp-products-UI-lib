export interface SideMenuItem {
  label: string;
  icon: string;
  link: string;
  permissionKey?: string;
}

export interface RouteNameItem {
  [key: string]: {
    name: string;
  };
}
