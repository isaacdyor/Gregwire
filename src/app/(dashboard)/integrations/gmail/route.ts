import { logtail } from "@/config/logtail-config";
import { env } from "@/env";
import { api } from "@/trpc/server";
import { OAuth2Client } from "google-auth-library";
import { type NextRequest, NextResponse } from "next/server";
import { startGmailWatch } from "./start-gmail-watch";
import { getGmailClient } from "@/utils/gmail";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/integrations?error=no_code", request.url),
    );
  }

  try {
    const auth = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.NEXT_PUBLIC_APP_URL}/integrations/gmail`,
    );

    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);

    const gmail = getGmailClient({
      accessToken: tokens.access_token ?? undefined,
      refreshToken: tokens.refresh_token ?? undefined,
    });

    const userProfile = await gmail.users.getProfile({
      userId: "me",
    });
    const initialHistoryId = userProfile.data.historyId;

    await logtail.info("Successfully generated tokens", {
      tokens,
      timestamp: new Date().toISOString(),
    });

    if (!tokens.access_token || !tokens.expiry_date) {
      throw new Error("Failed to obtain access token");
    }

    const newIntegration = await api.integrations.create({
      type: "GMAIL",
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? null,
      recentHistoryId: initialHistoryId ?? "",
      tokenExpiration: new Date(tokens.expiry_date),
      status: "ACTIVE",
      genericType: "EMAIL",
      user: {
        connect: {
          id: "",
        },
      },
    });

    await logtail.info("Successfully added integration", {
      newIntegration,
      timestamp: new Date().toISOString(),
    });

    if (newIntegration) {
      await startGmailWatch(newIntegration.userId, tokens);
    }

    await logtail.info("Successfully set up watch", {
      newIntegration,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.redirect(
      new URL("/integrations?integration=success", request.url),
    );
  } catch (error) {
    console.error("Error in Gmail callback:", error);
    await logtail.error("Error in Gmail Callback", {
      error,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.redirect(
      new URL("/integrations?error=token_exchange_failed", request.url),
    );
  } finally {
    await logtail.flush().catch(console.error);
  }
}
