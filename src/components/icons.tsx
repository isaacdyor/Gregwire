import {
  Calendar,
  Compass,
  Home,
  Key,
  Mail,
  MessageCircle,
  Settings,
  Usb,
  Users,
  Workflow,
} from "lucide-react";

export const Icons = {
  messages: MessageCircle,
  key: Key,
  settings: Settings,
  compass: Compass,
  users: Users,
  usb: Usb,
  workflow: Workflow,
  home: Home,
  mail: Mail,
  calendar: Calendar,
};

export type IconName = keyof typeof Icons;
