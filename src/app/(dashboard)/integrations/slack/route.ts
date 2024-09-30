import { env } from "@/env";
import { api } from "@/trpc/server";
import { WebClient } from "@slack/web-api";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SlackPayloadSchema = z.object({
  ok: z.boolean(),
  app_id: z.string(),
  authed_user: z.object({
    id: z.string(),
    scope: z.string(),
    access_token: z.string(),
    token_type: z.string(),
  }),
  team: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  console.log("Full request URL:", request.url);
  if (!code) {
    return NextResponse.redirect(
      new URL("/integrations?error=no_code", request.url),
    );
  }

  try {
    // Exchange the code for an access token
    const result = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: env.SLACK_CLIENT_ID,
        client_secret: env.SLACK_CLIENT_SECRET,
        code: code,
        redirect_uri: `${env.NEXT_PUBLIC_APP_URL}/integrations/slack`,
      }),
    });

    console.log("Slack response:", result);

    const data = SlackPayloadSchema.parse(await result.json());

    console.log("data:", data);

    const { team, authed_user } = data;

    if (!team || !authed_user) {
      throw new Error("Missing required data from Slack response");
    }

    console.log("Slack response:", data);

    // Initialize Slack WebClient
    const slack = new WebClient(authed_user.access_token);

    // Get user info
    const userInfo = await slack.users.info({
      user: authed_user.id,
    });

    console.log("Slack user info:", userInfo);

    if (!userInfo.ok) {
      throw new Error("Failed to fetch user info");
    }

    // Create new integration in your database
    const newIntegration = await api.slack.create({
      teamId: team.id,
      accessToken: authed_user.access_token,
      integration: {},
    });

    console.log("New integration:", newIntegration);

    return NextResponse.redirect(
      new URL("/integrations?integration=success", request.url),
    );
  } catch (error) {
    console.error("Error in Slack callback:", error);

    return NextResponse.redirect(
      new URL("/integrations?error=token_exchange_failed", request.url),
    );
  }
}
