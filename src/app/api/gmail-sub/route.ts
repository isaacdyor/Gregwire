import { logtail } from "@/config/logtail-config";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { processHistory } from "./process-history";
import { api } from "@/trpc/server";

const PubSubMessageSchema = z.object({
  message: z.object({
    data: z.string(),
    messageId: z.string(),
    publishTime: z.string(),
  }),
  subscription: z.string(),
});

const MessageDataSchema = z.object({
  emailAddress: z.string(),
  historyId: z.coerce.string(),
});

export async function POST(req: NextRequest) {
  try {
    console.log("RECIEVED REQUEST");
    const processingMessages = new Set();
    // Parse the JSON body
    const rawBody: unknown = await req.json();

    const body = PubSubMessageSchema.parse(rawBody);
    const messageId = body.message.messageId;

    if (processingMessages.has(messageId)) {
      return NextResponse.json(
        { success: true, duplicate: true, reason: "in-process" },
        { status: 200 },
      );
    }

    processingMessages.add(messageId);

    const existingMessage = await api.emails.getByMessageId(messageId);

    if (existingMessage) {
      return NextResponse.json(
        { success: true, duplicate: true },
        { status: 200 },
      );
    }

    const decodedData = Buffer.from(body.message.data, "base64").toString();

    // Parse the decoded data as JSON
    const jsonData: unknown = JSON.parse(decodedData);

    // Validate the parsed data against MessageDataSchema
    const validatedData = MessageDataSchema.parse(jsonData);

    await processHistory(validatedData.historyId, validatedData.emailAddress);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Error occurred, but acknowledged to prevent retry",
      },
      { status: 200 },
    );
  }
}

// import { NextResponse, type NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   const rawBody: unknown = await req.json();
//   console.log("rawBody", rawBody);

//   return NextResponse.json({ success: true }, { status: 200 });
// }
