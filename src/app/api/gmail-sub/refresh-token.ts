import { api } from "@/trpc/server";
import { type Integration } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";

export const refreshToken = async (integration: Integration) => {
  if (!integration?.refreshToken) {
    console.error("Invalid gmail integration", integration.email);
    return;
  }

  const isTokenExpiringSoon =
    integration.tokenExpiration &&
    integration.tokenExpiration.getTime() - Date.now() < 5 * 60 * 1000; // 5 minutes in milliseconds

  if (isTokenExpiringSoon) {
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      refresh_token: integration.refreshToken,
    });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();

      const updatedIntegration = await api.integrations.update({
        integrationId: integration.id,
        integration: {
          accessToken: credentials.access_token!,
          refreshToken: credentials.refresh_token ?? integration.refreshToken,
          tokenExpiration: credentials.expiry_date
            ? new Date(credentials.expiry_date)
            : undefined,
        },
      });

      console.log("Token refreshed successfully for", integration.email);
      return updatedIntegration;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }

  return integration;
};
