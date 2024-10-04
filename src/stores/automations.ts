// stores/useAutomationStore.ts
import { type AutomationWithTriggerAndActions } from "@/types/automations";
import { create } from "zustand";

interface AutomationStore {
  automation: AutomationWithTriggerAndActions | null;
  setAutomation: (automation: AutomationWithTriggerAndActions | null) => void;
}

export const useAutomationStore = create<AutomationStore>((set) => ({
  automation: null,
  setAutomation: (automation) => set({ automation }),
}));
