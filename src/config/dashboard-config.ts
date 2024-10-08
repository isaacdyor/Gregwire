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
    label: "Chat",
    url: "/chat",
    icon: "messages",
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
];
