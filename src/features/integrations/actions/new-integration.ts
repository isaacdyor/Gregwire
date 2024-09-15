"use server";

import { logtail } from "@/config/logtail-config";
import { google } from "googleapis";
import { env } from "@/env";

export async function integrateGmail() {
  console.log("Integrating Gmail");

  await logtail.info("Starting Gmail integration", {
    integration: "Gmail",
    timestamp: new Date().toISOString(),
  });

  try {
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`,
    );

    // Generate a url that asks permissions for Gmail scopes
    const scopes = [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
      // Add other scopes as needed
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
    });

    await logtail.info("Generated Gmail authorization URL", {
      integration: "Gmail",
      timestamp: new Date().toISOString(),
    });

    // Ensure that all logs are sent to Logtail
    await logtail.flush();

    return { success: true, authorizationUrl };
  } catch (error) {
    console.error("Error in Gmail integration:", error);

    await logtail.error("Failed to initiate Gmail integration", {
      integration: "Gmail",
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    // Ensure that all logs are sent to Logtail
    await logtail.flush();

    return { success: false, error: "Failed to initiate Gmail integration" };
  }
}
