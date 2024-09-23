import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

// Simplified schema for Slack payloads
const SlackPayloadSchema = z.object({
  type: z.string(),
  challenge: z.string().optional(),
  event: z
    .object({
      type: z.string(),
      user: z.string().optional(),
      channel: z.string().optional(),
      text: z.string().optional(),
      ts: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    console.log("RECEIVED SLACK REQUEST");

    // Parse the JSON body
    const rawBody: unknown = await req.json();
    const body = SlackPayloadSchema.parse(rawBody);

    console.log("Received Slack payload:", JSON.stringify(body, null, 2));

    // Handle URL verification challenge
    if (body.type === "url_verification" && body.challenge) {
      console.log("Handling URL verification challenge");
      return NextResponse.json({ challenge: body.challenge });
    }

    // Log event details if it's an event
    if (body.type === "event_callback" && body.event) {
      console.log("Received event:", body.event.type);
      console.log("Event details:", JSON.stringify(body.event, null, 2));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing Slack request:", error);

    // Always return 200 to acknowledge receipt, even on error
    return NextResponse.json(
      {
        success: false,
        error: "Error occurred, but acknowledged to prevent retry",
      },
      { status: 200 },
    );
  }
}
