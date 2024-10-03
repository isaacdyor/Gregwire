"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface RouteConfig {
  name: string | ((id: string) => string);
  children?: Record<string, RouteConfig>;
}

export type Routes = Record<string, RouteConfig>;

const routes: Routes = {
  automations: {
    name: "Automations",
    children: {
      "[id]": {
        name: (id: string) => `Automation ${id}`,
        children: {
          edit: { name: "Edit" },
          run: { name: "Run" },
        },
      },
      create: { name: "Create Automation" },
    },
  },
};

interface Crumb {
  name: string;
  path: string;
}

export const NavBreadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const generateBreadcrumbs = (
    routeConfig: Routes,
    segments: string[],
    currentPath = "",
  ): Crumb[] => {
    if (segments.length === 0) return [];

    const segment = segments[0];
    const remainingSegments = segments.slice(1);
    const newPath = `${currentPath}/${segment}`;

    if (!segment) return [];

    let currentConfig = routeConfig[segment];

    // Handle dynamic segments (e.g., [id])
    if (!currentConfig) {
      const dynamicKey = Object.keys(routeConfig).find(
        (key) => key.startsWith("[") && key.endsWith("]"),
      );
      if (dynamicKey) {
        currentConfig = routeConfig[dynamicKey];
      }
    }

    if (!currentConfig) return [];

    const crumb: Crumb = {
      name:
        typeof currentConfig.name === "function"
          ? currentConfig.name(segment)
          : currentConfig.name,
      path: newPath,
    };

    return [
      crumb,
      ...generateBreadcrumbs(
        currentConfig.children ?? {},
        remainingSegments,
        newPath,
      ),
    ];
  };

  const breadcrumbs = generateBreadcrumbs(routes, pathSegments);

  if (breadcrumbs.length < 2) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
