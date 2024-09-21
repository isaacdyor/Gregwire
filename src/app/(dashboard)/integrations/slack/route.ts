// import { env } from "@/env";
// import { api } from "@/trpc/server";
// import { type NextRequest, NextResponse } from "next/server";
// import { WebClient } from "@slack/web-api";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const code = searchParams.get("code");

//   if (!code) {
//     return NextResponse.redirect(
//       new URL("/integrations?error=no_code", request.url),
//     );
//   }

//   try {
//     // Exchange the code for an access token
//     const result = await fetch("https://slack.com/api/oauth.v2.access", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         client_id: env.SLACK_CLIENT_ID,
//         client_secret: env.SLACK_CLIENT_SECRET,
//         code: code,
//         redirect_uri: `${env.NEXT_PUBLIC_APP_URL}/integrations/slack`,
//       }),
//     });

//     const data: unknown = await result.json();

//     if (!data.ok) {
//       throw new Error(data.error || "Failed to exchange code for token");
//     }

//     const { access_token, team, authed_user } = data;

//     // Initialize Slack WebClient
//     const slack = new WebClient(access_token);

//     // Get user info
//     const userInfo = await slack.users.info({
//       user: authed_user.id,
//     });

//     if (!userInfo.ok) {
//       throw new Error("Failed to fetch user info");
//     }

//     // Create new integration in your database
//     const newIntegration = await api.integrations.create({
//       type: "SLACK",
//       accessToken: access_token,
//       refreshToken: null, // Slack doesn't use refresh tokens in the same way as Google
//       recentHistoryId: "", // Slack doesn't have a direct equivalent to Gmail's historyId
//       tokenExpiration: null, // Slack tokens don't have an expiration by default
//       status: "ACTIVE",
//       genericType: "CHAT",
//       user: {
//         connect: {
//           id: "", // You'll need to determine how to get the user ID in your system
//         },
//       },
//       metadata: JSON.stringify({
//         teamId: team.id,
//         teamName: team.name,
//         userId: authed_user.id,
//         userName: userInfo.user?.name,
//       }),
//     });

//     if (newIntegration) {
//       // Here you could set up any initial Slack-specific operations
//       // Similar to startGmailWatch in your Google example
//       // await setupSlackEvents(newIntegration.userId, access_token);
//     }

//     return NextResponse.redirect(
//       new URL("/integrations?integration=success", request.url),
//     );
//   } catch (error) {
//     console.error("Error in Slack callback:", error);

//     return NextResponse.redirect(
//       new URL("/integrations?error=token_exchange_failed", request.url),
//     );
//   }
// }
