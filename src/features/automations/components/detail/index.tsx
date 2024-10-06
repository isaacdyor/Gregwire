"use client";

import { useAutomationStore } from "@/stores/automations";
import { useCallback, useEffect } from "react";
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
  const { data: automation } = api.automations.getById.useQuery({
    id: automationId,
  });

  const setAutomation = useAutomationStore((state) => state.setAutomation);
  const setActiveIndex = useAutomationStore((state) => state.setActiveIndex);
  const activeIndex = useAutomationStore((state) => state.activeIndex);
  console.log("activeIndex", activeIndex);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const automationIndex = searchParams.get("index");

  useEffect(() => {
    if (automation) {
      setAutomation(automation);
    }
  }, [automation, setAutomation]);

  useEffect(() => {
    if (automationIndex) {
      setActiveIndex(Number(automationIndex));
    }
  }, [automationIndex, setActiveIndex]);

  const setAutomationIndex = (index: number) => {
    setActiveIndex(index);
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
            active={activeIndex !== null && Number(activeIndex) === 0}
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
              active={Number(activeIndex) === index + 1}
              index={index + 1}
              firstPosition={action.position}
              setAutomationIndex={setAutomationIndex}
              nextPosition={automation.actions[index + 1]?.position ?? null}
            >
              <ActionElement action={action} index={index} />
            </AutomationElement>
          ))}
        </div>
      </Canvas>

      <AutomationElementDetail />
    </div>
  );
};
