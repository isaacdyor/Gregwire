import { api } from "@/trpc/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// Simplified schema for Slack payloads
const SlackPayloadSchema = z.object({
  type: z.string(),
  challenge: z.string().optional(),
  team_id: z.string(),
  event: z
    .object({
      type: z.string(),
      user: z.string(),
      channel: z.string(),
      text: z.string(),
      ts: z.string(),
      thread_ts: z.string().optional(),
    })
    .optional(),
  authorizations: z
    .array(
      z.object({
        enterprise_id: z.string().nullable(),
        team_id: z.string(),
        user_id: z.string(),
        is_bot: z.boolean(),
        is_enterprise_install: z.boolean(),
      }),
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    console.log("RECEIVED SLACK REQUEST");

    // Parse the JSON body
    const rawBody: unknown = await req.json();
    console.log("Raw body:", rawBody);
    const body = SlackPayloadSchema.parse(rawBody);

    console.log("Received Slack payload:", JSON.stringify(body, null, 2));

    // Handle URL verification challenge
    if (body.type === "url_verification" && body.challenge) {
      console.log("Handling URL verification challenge");
      return NextResponse.json({ challenge: body.challenge });
    }

    if (!body.authorizations?.[0]?.user_id) {
      console.error("No authorizations found in payload");
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Log event details if it's an event
    if (body.type === "event_callback" && body.event) {
      const newMessage = await api.messages.create({
        messageId: body.event.ts,
        senderId: body.event.user,
        channelId: body.event.channel,
        text: body.event.text,
        timestamp: body.event.ts,
        threadTs: body.event.thread_ts,
        slackIntegration: {
          connect: {
            slackUserId: body.authorizations[0].user_id,
          },
        },
      });
      console.log("New message:", newMessage);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing Slack request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error occurred, but acknowledged to prevent retry",
      },
      { status: 200 },
    );
  }
}
