import { logtail } from "@/config/logtail-config";
import { api } from "@/trpc/server";
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

const MessageDataSchema = z.object({
  emailAddress: z.string(),
  historyId: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const rawBody: unknown = await req.json();

    void logtail.info("Received req", {
      rawBody,
      timestamp: new Date().toISOString(),
    });

    const body = PubSubMessageSchema.parse(rawBody);

    void logtail.info("Parsed Request", {
      body,
      timestamp: new Date().toISOString(),
    });

    const existingMessage = await api.emails.getByMessageId(
      body.message.messageId,
    );

    if (existingMessage) {
      void logtail.info("Duplicate message received, skipping processing", {
        messageId: body.message.messageId,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { success: true, duplicate: true },
        { status: 200 },
      );
    }
    void logtail.info("Before Decode", {
      timestamp: new Date().toISOString(),
    });
    const decodedData = Buffer.from(body.message.data, "base64").toString();

    void logtail.info("Parsed message", {
      decodedData,
      timestamp: new Date().toISOString(),
    });
    // Parse the decoded data as JSON
    const jsonData: unknown = JSON.parse(decodedData);

    // Validate the parsed data against MessageDataSchema
    const validatedData = MessageDataSchema.parse(jsonData);

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

    void logtail.info("Created New Email", {
      newEmail,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    void logtail.error("Error processing request", { error });
    return NextResponse.json({ error: "Bad Request" }, { status: 200 });
  } finally {
    await logtail.flush();
  }
}
