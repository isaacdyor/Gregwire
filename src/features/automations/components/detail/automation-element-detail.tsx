export const AutomationElementDetail: React.FC<{
  automationIndex: number | null;
  setAutomationIndex: (index: number | null) => void;
}> = ({ automationIndex }) => {
  return automationIndex && <div>AutomationElementDetail</div>;
};
