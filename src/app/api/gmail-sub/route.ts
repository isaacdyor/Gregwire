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
    console.log("RECEIVED REQUEST");

    // Parse the JSON body
    const rawBody: unknown = await req.json();
    const body = PubSubMessageSchema.parse(rawBody);

    const decodedData = Buffer.from(body.message.data, "base64").toString();
    const jsonData: unknown = JSON.parse(decodedData);
    const validatedData = MessageDataSchema.parse(jsonData);

    const integration = await api.integrations.getByEmail({
      email: validatedData.emailAddress,
    });

    if (!integration) {
      return NextResponse.json(
        {
          success: false,
          error: "Error occurred, but acknowledged to prevent retry",
        },
        { status: 200 },
      );
    }

    if (integration?.recentHistoryId === validatedData.historyId) {
      return NextResponse.json(
        { success: true, duplicate: true, reason: "in-database" },
        { status: 200 },
      );
    }

    await processHistory(
      validatedData.historyId,
      validatedData.emailAddress,
      integration,
    );

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
