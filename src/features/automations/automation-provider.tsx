"use client";

import React, { createContext, useRef } from "react";
import {
  type AutomationStore,
  createAutomationStore,
} from "./automation-store";

export const AutomationStoreContext = createContext<AutomationStore | null>(
  null,
);

export function AutomationStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AutomationStore>();
  if (!storeRef.current) {
    storeRef.current = createAutomationStore();
  }

  return (
    <AutomationStoreContext.Provider value={storeRef.current}>
      {children}
    </AutomationStoreContext.Provider>
  );
}
