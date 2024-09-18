import {
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
  chat: MessageCircle,
  key: Key,
  settings: Settings,
  compass: Compass,
  users: Users,
  usb: Usb,
  workflow: Workflow,
  home: Home,
  mail: Mail,
};

export type IconName = keyof typeof Icons;
