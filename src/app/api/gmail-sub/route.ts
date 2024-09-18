import { logtail } from "@/config/logtail-config";
import { api } from "@/trpc/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getMessage } from "./get-message";

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
    // Parse the JSON body
    const rawBody: unknown = await req.json();

    const body = PubSubMessageSchema.parse(rawBody);

    const existingMessage = await api.emails.getByMessageId(
      body.message.messageId,
    );

    // if (existingMessage) {
    //   return NextResponse.json(
    //     { success: true, duplicate: true },
    //     { status: 200 },
    //   );
    // }

    const decodedData = Buffer.from(body.message.data, "base64").toString();

    // Parse the decoded data as JSON
    const jsonData: unknown = JSON.parse(decodedData);

    // Validate the parsed data against MessageDataSchema
    const validatedData = MessageDataSchema.parse(jsonData);

    void logtail.info("Before getMessage call", {
      historyId: validatedData.historyId,
      timestamp: new Date().toISOString(),
    });

    await getMessage(validatedData.historyId, validatedData.emailAddress);

    void logtail.info("After getMessage call", {
      historyId: validatedData.historyId,
      timestamp: new Date().toISOString(),
    });

    const newEmail = await api.emails.create({
      email: {
        historyId: String(validatedData.historyId),
        messageId: body.message.messageId,
        receivedAt: new Date(),
        processed: false,
        integration: {
          connect: {
            id: "", // plug in integration email directly
          },
        },
      },
      integrationEmail: validatedData.emailAddress,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    // Even if there's an error, we return a 200 status to prevent Pub/Sub from retrying
    return NextResponse.json(
      {
        success: false,
        error: "Error occurred, but acknowledged to prevent retry",
      },
      { status: 200 },
    );
  } finally {
    await logtail.flush();
  }
}
