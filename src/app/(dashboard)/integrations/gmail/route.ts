import { env } from "@/env";
import { api } from "@/trpc/server";
import { getGmailClient } from "@/utils/gmail";
import { OAuth2Client } from "google-auth-library";
import { type NextRequest, NextResponse } from "next/server";
import { startGmailSub } from "./start-gmail-sub";

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

    if (!tokens.access_token || !tokens.expiry_date) {
      throw new Error("Failed to obtain access token");
    }

    if (!userProfile.data.emailAddress) {
      throw new Error("Failed to obtain user email");
    }

    const newIntegration = await api.gmail.create({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? null,
      recentHistoryId: initialHistoryId ?? "",
      tokenExpiration: new Date(tokens.expiry_date),
      email: userProfile.data.emailAddress,
      integration: {},
    });

    if (newIntegration) {
      await startGmailSub(tokens);
    }

    return NextResponse.redirect(
      new URL("/integrations?integration=success", request.url),
    );
  } catch (error) {
    console.error("Error in Gmail callback:", error);

    return NextResponse.redirect(
      new URL("/integrations?error=token_exchange_failed", request.url),
    );
  }
}
