"use client";

import { type Action, type Trigger } from "@prisma/client";
import { createStore } from "zustand";

export interface AutomationState {
  activeAutomationElement: Trigger | Action | null;
  setActiveAutomationElement: (element: Trigger | Action | null) => void;
}

export type AutomationStore = ReturnType<typeof createAutomationStore>;

export const createAutomationStore = () => {
  return createStore<AutomationState>()((set) => ({
    activeAutomationElement: null,
    setActiveAutomationElement: (element: Trigger | Action | null) => {
      set({ activeAutomationElement: element });
    },
  }));
};
