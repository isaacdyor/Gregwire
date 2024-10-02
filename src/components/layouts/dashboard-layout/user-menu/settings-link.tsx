import { Settings } from "lucide-react";
import Link from "next/link";

export const SettingsLink = () => {
  return (
    <Link
      href="/settings"
      className="flex gap-2 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-muted"
    >
      <Settings className="h-5 w-5 text-muted-foreground" />

      <p className="text-sm text-muted-foreground">Settings</p>
    </Link>
  );
};
