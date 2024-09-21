"use server";

import { env } from "@/env";
import { OAuth2Client } from "google-auth-library";

export async function getGmailAuthlUrl() {
  const startTime = Date.now();
  try {
    const oauth2Client = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.NEXT_PUBLIC_APP_URL}/integrations/gmail`,
    );

    const scopes = [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
    });
    console.timeEnd("generateAuthUrl");

    const endTime = Date.now();
    console.log(`Total execution time: ${endTime - startTime}ms`);

    return { success: true, authorizationUrl };
  } catch (error) {
    console.error("Error in Gmail integration:", error);

    return { success: false, error: "Failed to initiate Gmail integration" };
  }
}
