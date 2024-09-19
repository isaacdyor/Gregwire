// import { logtail } from "@/config/logtail-config";
// import { NextResponse, type NextRequest } from "next/server";
// import { z } from "zod";
// import { processHistory } from "./process-history";
// import { api } from "@/trpc/server";

// const PubSubMessageSchema = z.object({
//   message: z.object({
//     data: z.string(),
//     messageId: z.string(),
//     publishTime: z.string(),
//   }),
//   subscription: z.string(),
// });

// const MessageDataSchema = z.object({
//   emailAddress: z.string(),
//   historyId: z.coerce.string(),
// });

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the JSON body
//     const rawBody: unknown = await req.json();

//     const body = PubSubMessageSchema.parse(rawBody);

//     void logtail.info("Request", {
//       body,
//       timestamp: new Date().toISOString(),
//     });

//     const existingMessage = await api.emails.getByMessageId(
//       body.message.messageId,
//     );

//     if (existingMessage) {
//       return NextResponse.json(
//         { success: true, duplicate: true },
//         { status: 200 },
//       );
//     }

//     const decodedData = Buffer.from(body.message.data, "base64").toString();

//     // Parse the decoded data as JSON
//     const jsonData: unknown = JSON.parse(decodedData);

//     // Validate the parsed data against MessageDataSchema
//     const validatedData = MessageDataSchema.parse(jsonData);

//     void logtail.info("Before getMessage call", {
//       historyId: validatedData.historyId,
//       timestamp: new Date().toISOString(),
//     });

//     await processHistory(validatedData.historyId, validatedData.emailAddress);

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Error processing request:", error);

//     // Even if there's an error, we return a 200 status to prevent Pub/Sub from retrying
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Error occurred, but acknowledged to prevent retry",
//       },
//       { status: 200 },
//     );
//   } finally {
//     await logtail.flush();
//   }
// }

import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const rawBody: unknown = await req.json();
  console.log("rawBody", rawBody);

  return NextResponse.json({ success: true }, { status: 200 });
}
