import { type IconName } from "@/components/icons";

type DashboardItemBase = {
  label: string;
  icon: IconName;
};

type DashboardItemWithUrl = DashboardItemBase & {
  url: string;
};

type DashboardItemWithChildren = DashboardItemBase & {
  children: DashboardItemWithUrl[];
};

type DashboardItem = DashboardItemWithUrl | DashboardItemWithChildren;

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
    label: "Communications",
    icon: "mail",
    children: [
      {
        label: "Emails",
        url: "/emails",
        icon: "mail",
      },
      {
        label: "Messages",
        url: "/messages",
        icon: "messages",
      },
      {
        label: "Events",
        url: "/events",
        icon: "calendar",
      },
    ],
  },
  {
    label: "Settings",
    url: "/settings",
    icon: "settings",
  },
];
