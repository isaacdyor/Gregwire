// File: src/utils/oauth2-client.ts

import { type Credentials, OAuth2Client } from "google-auth-library";
import { env } from "process";

let oauth2Client: OAuth2Client | null = null;

export function getOAuth2Client(credentials?: Credentials): OAuth2Client {
  if (!oauth2Client) {
    oauth2Client = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.NEXT_PUBLIC_APP_URL}/integrations/gmail`,
    );
  }

  if (credentials) {
    oauth2Client.setCredentials(credentials);
  }

  return oauth2Client;
}
