import { type NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { env } from "@/env";
import { logtail } from "@/config/logtail-config";
import { api } from "@/trpc/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/integrations?error=no_code", request.url),
    );
  }

  try {
    const oauth2Client = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.NEXT_PUBLIC_APP_URL}/integrations/gmail`,
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    void logtail.info("Succesfully generated tokens", {
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
      tokenExpiration: new Date(tokens.expiry_date),
      status: "ACTIVE",
      user: {
        connect: {
          id: "", // using ctx.user.id
        },
      },
    });

    void logtail.info("Succesfully added integration", {
      newIntegration,
      timestamp: new Date().toISOString(),
    });

    // Redirect to success page
    return NextResponse.redirect(
      new URL("/dashboard?integration=success", request.url),
    );
  } catch (error) {
    console.error("Error in Gmail callback:", error);
    void logtail.error("Error in Gmail Callback", {
      error,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.redirect(
      new URL("/integrations?error=token_exchange_failed", request.url),
    );
  } finally {
    // Flush logs asynchronously
    logtail.flush().catch(console.error);
  }
}
