import { gmail_v1 } from "@googleapis/gmail";
import { OAuth2Client } from "google-auth-library";
import { env } from "process";

type ClientOptions = {
  accessToken?: string;
  refreshToken?: string;
};

export const getClient = (session: ClientOptions) => {
  const auth = new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET);

  auth.setCredentials({
    access_token: session.accessToken,
    refresh_token: session.refreshToken,
  });

  return auth;
};

export const getGmailClient = (session: ClientOptions) => {
  const auth = getClient(session);
  const gmail = new gmail_v1.Gmail({
    auth,
  });

  return gmail;
};

export const getGmailAccessToken = (session: ClientOptions) => {
  const auth = getClient(session);
  return auth.getAccessToken();
};
