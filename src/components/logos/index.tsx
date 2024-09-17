import { GithubLogo } from "./github-logo";
import { GmailLogo } from "./gmail-logo";
import { GoogleCalendarLogo } from "./google-calendar-logo";
import { GoogleLogo } from "./google-logo";
import { SlackLogo } from "./slack-logo";

export const Logos = {
  google: GoogleLogo,
  github: GithubLogo,
  gmail: GmailLogo,
  googleCalendar: GoogleCalendarLogo,
  slack: SlackLogo,
};

export type LogoName = keyof typeof Logos;
