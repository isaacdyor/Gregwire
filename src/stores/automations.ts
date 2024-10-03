// stores/useAutomationStore.ts
import { type Automation } from "@prisma/client";
import { create } from "zustand";

interface AutomationStore {
  automation: Automation | null;
  setAutomation: (automation: Automation | null) => void;
}

export const useAutomationStore = create<AutomationStore>((set) => ({
  automation: null,
  setAutomation: (automation) => set({ automation }),
}));
