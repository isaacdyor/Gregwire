"use client";

import { useAutomationStore } from "@/stores/automations";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AutomationElement } from "./automation-element";
import { AutomationElementDetail } from "./automation-element-detail";
import { ActionElement } from "./automation-element/action-element";
import { TriggerElement } from "./automation-element/trigger-element";
import { Canvas } from "./canvas";
import { api } from "@/trpc/react";

interface AutomationDetailProps {
  automationId: string;
}

export const AutomationDetail = ({ automationId }: AutomationDetailProps) => {
  const setAutomation = useAutomationStore((state) => state.setAutomation);
  const { data: automation } = api.automations.getById.useQuery({
    id: automationId,
  });

  useEffect(() => {
    if (automation) {
      setAutomation(automation);
    }
  }, [automation, setAutomation]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const automationIndex = searchParams.get("index");

  const setAutomationIndex = (index: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("index", index.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!automation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] w-[calc(100%-438px)] flex-col items-center pt-20">
          <AutomationElement
            automationId={automation.id}
            active={automationIndex !== null && Number(automationIndex) === 0}
            setAutomationIndex={setAutomationIndex}
            firstPosition={0}
            nextPosition={automation.actions[0]?.position ?? null}
            index={0}
          >
            <TriggerElement trigger={automation.trigger} />
          </AutomationElement>
          {automation.actions.map((action, index) => (
            <AutomationElement
              key={action.id}
              automationId={automation.id}
              active={Number(automationIndex) === index + 1}
              index={index + 1}
              firstPosition={action.position}
              setAutomationIndex={setAutomationIndex}
              nextPosition={automation.actions[index + 1]?.position ?? null}
            >
              <ActionElement action={action} />
            </AutomationElement>
          ))}
        </div>
      </Canvas>

      <AutomationElementDetail />
    </div>
  );
};
