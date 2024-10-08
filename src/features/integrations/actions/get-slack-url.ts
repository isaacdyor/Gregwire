"use server";

import { env } from "@/env";

export async function getSlackAuthUrl() {
  const startTime = Date.now();
  try {
    // Define the scopes you need for your Slack app
    const scopes = [
      "channels:history",
      "channels:read",
      "groups:history",
      "groups:read",
      "im:history",
      "im:read",
      "users:read",
    ].join(",");

    // Construct the Slack authorization URL
    const authorizationUrl = new URL("https://slack.com/oauth/v2/authorize");
    authorizationUrl.searchParams.append("client_id", env.SLACK_CLIENT_ID);
    authorizationUrl.searchParams.append("user_scope", scopes);
    authorizationUrl.searchParams.append(
      "redirect_uri",
      `${env.NEXT_PUBLIC_APP_URL}/integrations/slack`,
    );

    const endTime = Date.now();
    console.log(`Total execution time: ${endTime - startTime}ms`);

    return { success: true, authorizationUrl: authorizationUrl.toString() };
  } catch (error) {
    console.error("Error in Slack integration:", error);

    return { success: false, error: "Failed to initiate Slack integration" };
  }
}
