import { type LogoName } from "@/components/logos";
import { integrateGmail } from "@/features/integrations/actions/new-integration";
import { type IntegrationType } from "@prisma/client";

// Updated IntegrationItem interface
interface IntegrationItem {
  type: IntegrationType;
  title: string;
  logo: LogoName;
  description: string;
  onIntegrate: () => Promise<void>;
}

// The type for the entire configuration array remains the same
type IntegrationConfig = IntegrationItem[];

// Mock integration functions

const integrateSlack = async (): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
        console.log("Slack integration completed");
      } else {
        reject(new Error("Slack integration failed"));
      }
    }, 2000);
  });
};

const integrateGoogleCalendar = async (): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  console.log("Google Calendar integration completed");
};

const callIntegrateGmail = async (): Promise<void> => {
  const result = await integrateGmail();
  if (result.success && result.authorizationUrl) {
    console.log("Redirecting to:", result.authorizationUrl);
    window.location.href = result.authorizationUrl;
  }
};

// Updated integrationConfig with promise-based onIntegrate functions
export const integrationConfig: IntegrationConfig = [
  {
    type: "GMAIL",
    title: "Gmail",
    logo: "gmail",
    description: "Integrate your Gmail account to sync emails and contacts.",
    onIntegrate: callIntegrateGmail,
  },
  {
    type: "SLACK",
    title: "Slack",
    logo: "slack",
    description: "Connect your Slack workspace for seamless communication.",
    onIntegrate: integrateSlack,
  },
  {
    type: "GOOGLE_CALENDAR",
    title: "Google Calendar",
    logo: "googleCalendar",
    description: "Sync your Google Calendar to manage events and schedules.",
    onIntegrate: integrateGoogleCalendar,
  },
];

export type { IntegrationConfig, IntegrationItem };
