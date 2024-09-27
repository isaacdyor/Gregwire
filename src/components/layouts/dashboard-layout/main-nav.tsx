"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { dashboardConfig } from "@/config/dashboard-config";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useMemo } from "react";
import { useDashboard } from "./use-dashboard";
import { UserMenu } from "./user-menu";

export const MainNav: React.FC = () => {
  const segment = useSelectedLayoutSegment();
  const { isOpen, setIsOpen, dropdownOpen, setDropdownOpen } = useDashboard();

  const sidebarItems = useMemo(() => {
    return dashboardConfig.map((item) => {
      const Icon = Icons[item.icon];

      if ("children" in item) {
        // This is a dropdown item
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={cn(
                "flex h-10 w-full items-center rounded-md px-2.5 text-sm text-muted-foreground hover:bg-secondary/50",
                // dropdownOpen ? "bg-secondary" : "hover:bg-green-500/50",
              )}
              // onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <ChevronRight
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform",
                  dropdownOpen && "rotate-90",
                )}
              />
              <span
                className={cn(
                  "ml-3 transition-all duration-200",
                  isOpen ? "w-auto opacity-100" : "w-0 opacity-0",
                )}
              >
                {item.label}
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                dropdownOpen && isOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <div className="mt-1 space-y-1 pl-1.5">
                {item.children.map((child) => {
                  const ChildIcon = Icons[child.icon];
                  return (
                    <Link
                      href={child.url}
                      key={child.label}
                      className={cn(
                        "flex h-8 items-center gap-3 rounded-md px-2.5 text-sm text-muted-foreground transition-colors duration-100",
                        child.url.startsWith(`/${segment}`)
                          ? "bg-secondary"
                          : "hover:bg-secondary/50",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <ChildIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{child.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      } else {
        // This is a regular item
        return (
          <Link
            href={item.url}
            key={item.label}
            className={cn(
              "flex h-10 items-center rounded-md px-2.5 text-sm text-muted-foreground",
              item.url.startsWith(`/${segment}`)
                ? "bg-secondary"
                : "hover:bg-secondary/50",
            )}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex w-full items-center overflow-hidden">
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span
                className={cn(
                  "ml-3 transition-all duration-200",
                  isOpen ? "w-auto opacity-100" : "w-0 opacity-0",
                )}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      }
    });
  }, [dropdownOpen, isOpen, setDropdownOpen, segment, setIsOpen]);

  return (
    <div
      className={cn(
        "absolute z-40 flex h-full bg-background transition-transform duration-200 ease-in-out md:static",
        "w-52 md:w-auto",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="hidden h-screen w-14 md:block" />
      <div
        className={cn(
          "absolute z-40 flex h-screen flex-col justify-between border-r bg-background px-2 py-4 transition-all duration-200",
          isOpen ? "w-52 max-w-52" : "w-14",
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex w-full items-center px-2">
            <Logo full={isOpen} />
          </div>

          <nav className="flex flex-col space-y-1">{sidebarItems}</nav>
        </div>

        <UserMenu />
      </div>
    </div>
  );
};
