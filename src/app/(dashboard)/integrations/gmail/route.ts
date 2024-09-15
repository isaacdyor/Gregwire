import { type NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { env } from "@/env";
import { logtail } from "@/config/logtail-config";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  void logtail.info("Inside gmail integration route", {
    integration: "Gmail",
    code,
    timestamp: new Date().toISOString(),
  });

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

    // Here, you should store the tokens securely (e.g., in your database)
    // await storeTokens(tokens);

    // Log success
    void logtail.info("Successfully exchanged code for tokens", {
      integration: "Gmail",
      timestamp: new Date().toISOString(),
    });

    // Redirect to success page
    return NextResponse.redirect(
      new URL("/dashboard?integration=success", request.url),
    );
  } catch (error) {
    console.error("Error in Gmail callback:", error);

    // Log error
    void logtail.error("Failed to exchange code for tokens", {
      integration: "Gmail",
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    // Redirect to error page
    return NextResponse.redirect(
      new URL("/integrations?error=token_exchange_failed", request.url),
    );
  } finally {
    // Flush logs asynchronously
    logtail.flush().catch(console.error);
  }
}
