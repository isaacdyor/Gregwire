"use server";

import { logtail } from "@/config/logtail-config";
import { OAuth2Client } from "google-auth-library";
import { env } from "@/env";

export async function integrateGmail() {
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

    // Log success without awaiting
    void logtail.info("Generated Gmail authorization URL", {
      integration: "Gmail",
      authorizationUrl: authorizationUrl,
      timestamp: new Date().toISOString(),
      executionTime: endTime - startTime,
    });

    // Flush logs asynchronously
    logtail.flush().catch(console.error);

    return { success: true, authorizationUrl };
  } catch (error) {
    console.error("Error in Gmail integration:", error);

    // Log error without awaiting
    void logtail.error("Failed to initiate Gmail integration", {
      integration: "Gmail",
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    // Flush logs asynchronously
    logtail.flush().catch(console.error);

    return { success: false, error: "Failed to initiate Gmail integration" };
  }
}
