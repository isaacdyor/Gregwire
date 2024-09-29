import { type LogoName } from "@/components/logos";
import { getGmailAuthlUrl } from "@/features/integrations/actions/get-gmail-url";
import { getSlackAuthUrl } from "@/features/integrations/actions/get-slack-url";
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

// const integrateGoogleCalendar = async (): Promise<void> => {
//   await new Promise<void>((resolve) => setTimeout(resolve, 2000));
//   console.log("Google Calendar integration completed");
// };

type AuthUrlResult = {
  success: boolean;
  authorizationUrl?: string;
};

type GetAuthUrlFunction = () => Promise<AuthUrlResult>;

const integrateService = async (
  getAuthUrlFn: GetAuthUrlFunction,
): Promise<void> => {
  const result = await getAuthUrlFn();
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
    onIntegrate: () => integrateService(getGmailAuthlUrl),
  },
  {
    type: "SLACK",
    title: "Slack",
    logo: "slack",
    description: "Connect your Slack workspace for seamless communication.",
    onIntegrate: () => integrateService(getSlackAuthUrl),
  },
  // {
  //   type: "GOOGLE_CALENDAR",
  //   title: "Google Calendar",
  //   logo: "googleCalendar",
  //   description: "Sync your Google Calendar to manage events and schedules.",
  //   onIntegrate: integrateGoogleCalendar,
  // },
];

export type { IntegrationConfig, IntegrationItem };
