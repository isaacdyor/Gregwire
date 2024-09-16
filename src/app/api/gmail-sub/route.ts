import { logtail } from "@/config/logtail-config";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const PubSubMessageSchema = z.object({
  message: z.object({
    data: z.string(),
    messageId: z.string(),
    publishTime: z.string(),
  }),
  subscription: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const rawBody: unknown = await req.json();
    const body = PubSubMessageSchema.parse(rawBody);

    void logtail.info("Received hit", {
      body,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    void logtail.error("Error processing request", { error });
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
