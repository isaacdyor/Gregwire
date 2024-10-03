// stores/useAutomationStore.ts
import { create } from "zustand";

interface AutomationStore {
  automationTitle: string | null;
  setAutomationTitle: (automationTitle: string | null) => void;
}

export const useAutomationStore = create<AutomationStore>((set) => ({
  automationTitle: null,
  setAutomationTitle: (automationTitle) => set({ automationTitle }),
}));
