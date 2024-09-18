import { type IconName } from "@/components/icons";

interface DashboardItem {
  label: string;
  url: string;
  icon: IconName;
}

export const dashboardConfig: DashboardItem[] = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: "home",
  },
  {
    label: "Automations",
    url: "/automations",
    icon: "workflow",
  },
  {
    label: "Integrations",
    url: "/integrations",
    icon: "usb",
  },
  {
    label: "Emails",
    url: "/emails",
    icon: "mail",
  },
  {
    label: "Settings",
    url: "/settings",
    icon: "settings",
  },
];
