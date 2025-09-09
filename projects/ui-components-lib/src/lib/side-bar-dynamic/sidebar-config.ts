import { AppButtonIconPos, AppButtonSeverity, AppButtonSize, AppButtonVariant } from "@ui-components";

export interface SidebarActionConfig {
  title?: string;
  icon?: string;
  size?: AppButtonSize;
  style?: AppButtonSeverity;
  iconPos?: AppButtonIconPos;
  variant?: AppButtonVariant;
}

export interface SidebarConfig {
  title: string;
  show: boolean;
  visible: boolean;
  closable: boolean;
  dismissible: boolean;
  closeOnEscape: boolean;
  sidebarSize: "sm" | "md" | "lg" | "xl";
  styleClass?: string;
  showCancelBtn: boolean;
  showSaveBtn: boolean;
  showSaveAndMoreBtn: boolean;
  actions?: {
    cancel?: SidebarActionConfig;
    save?: SidebarActionConfig;
    saveAndMore?: SidebarActionConfig;
  };
}

export const SidebarConfigDefaults: SidebarConfig = {
  title: "",
  show: true,
  visible: true,
  closable: true,
  dismissible: false,
  closeOnEscape: false,
  sidebarSize: "md",
  showCancelBtn: true,
  showSaveBtn: true,
  showSaveAndMoreBtn: true,
  actions: {
    save: {},
    saveAndMore: {
      variant: "outlined"
    }
  }
};
