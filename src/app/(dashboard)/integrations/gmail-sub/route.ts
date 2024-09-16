import { logtail } from "@/config/logtail-config";
import { PubSub } from "@google-cloud/pubsub";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const pubsub = new PubSub({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const topicName = "gmail-notifications";
const subscriptionName = "gmail-notifications-sub";

const MessageSchema = z.object({
  message: z.object({
    data: z.string(),
  }),
});

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    if (!req.body || typeof req.body !== "object") {
      throw new Error("Invalid request body");
    }

    const body = req.body;

    void logtail.info("Recieved hit", {
      body,
      timestamp: new Date().toISOString(),
    });

    const validatedMessage = MessageSchema.parse(body);

    void logtail.info("Validated message", {
      validatedMessage,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
