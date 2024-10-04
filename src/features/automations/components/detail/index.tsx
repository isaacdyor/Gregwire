"use client";

import { useAutomationStore } from "@/stores/automations";
import { type AutomationWithTriggerAndActions } from "@/types/automations";
import { useEffect } from "react";

import { ActionElement } from "./action-element";
import { AutomationElementDetail } from "./automation-element-detail";
import { Canvas } from "./canvas";
import { TriggerElement } from "./trigger-element";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AutomationDetail = ({
  automation,
}: {
  automation: AutomationWithTriggerAndActions;
}) => {
  const setAutomation = useAutomationStore((state) => state.setAutomation);

  useEffect(() => {
    setAutomation(automation);
    return () => setAutomation(null);
  }, [automation, automation.title, setAutomation]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setAutomationIndex = (index: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("index", index.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] w-[calc(100%-438px)] flex-col pt-20">
          <TriggerElement
            setAutomationIndex={setAutomationIndex}
            trigger={automation.trigger}
          />
          {automation.actions.map((action, index) => {
            return (
              <ActionElement
                key={action.id}
                action={action}
                index={index}
                setAutomationIndex={setAutomationIndex}
              />
            );
          })}
        </div>
      </Canvas>

      <AutomationElementDetail />
    </div>
  );
};
