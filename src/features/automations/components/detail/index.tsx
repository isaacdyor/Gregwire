"use client";

import { useAutomationStore } from "@/stores/automations";
import { api } from "@/trpc/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AutomationElement } from "./automation-element";
import { AutomationElementDetail } from "./automation-element-detail";
import { ActionElement } from "./automation-element/action-element";
import { TriggerElement } from "./automation-element/trigger-element";
import { Canvas } from "./canvas";

interface AutomationDetailProps {
  automationId: string;
}

export const AutomationDetail = ({ automationId }: AutomationDetailProps) => {
  const { data: automation } = api.automations.getById.useQuery({
    id: automationId,
  });

  console.log(automation);
  // console.log(parseAutomation(automation!));

  const setAutomation = useAutomationStore((state) => state.setAutomation);
  const setActiveIndex = useAutomationStore((state) => state.setActiveIndex);
  const activeIndex = useAutomationStore((state) => state.activeIndex);

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

  useEffect(() => {
    if (activeIndex !== null) {
      router.replace(`${pathname}?index=${activeIndex}`);
    } else {
      router.replace(pathname);
    }
  }, [activeIndex, pathname, router]);

  if (!automation) {
    return <div>Not Found</div>;
  }

  return (
    <div className="relative h-full w-full">
      <Canvas>
        <div className="flex h-[calc(100vh-24px)] w-[calc(100%-438px)] flex-col items-center pt-20">
          <AutomationElement
            automationId={automation.id}
            active={activeIndex !== null && Number(activeIndex) === 0}
            setActiveIndex={setActiveIndex}
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
              setActiveIndex={setActiveIndex}
              nextPosition={automation.actions[index + 1]?.position ?? null}
            >
              <ActionElement action={action} index={index + 1} />
            </AutomationElement>
          ))}
        </div>
      </Canvas>

      <AutomationElementDetail />
    </div>
  );
};
