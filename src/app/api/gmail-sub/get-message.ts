import { logtail } from "@/config/logtail-config";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { env } from "process";

export async function getMessage(historyId: string) {
  try {
    void logtail.info("Called get message", {
      timestamp: new Date().toISOString(),
    });
    // Set up Gmail API client
    const auth = new OAuth2Client(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      `${env.NEXT_PUBLIC_APP_URL}/integrations/gmail`,
    );
    // You need to set up authentication here, e.g., using a service account or user credentials
    // auth.setCredentials(...);

    const gmail = google.gmail({ version: "v1", auth });

    // Fetch history
    const history = await gmail.users.history.list({
      userId: "me",
      startHistoryId: historyId,
    });

    if (!history.data.history) {
      console.log("No new changes found");
      return;
    }

    // Process new messages
    for (const historyItem of history.data.history) {
      if (!historyItem.messages) continue;

      for (const message of historyItem.messages) {
        if (!message.id) continue;

        // Fetch full message details
        const fullMessage = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });

        if (!fullMessage.data?.payload) {
          console.log("Failed to fetch message details");
          continue;
        }

        // Extract email information
        const subject =
          fullMessage.data.payload.headers?.find(
            (header) => header.name?.toLowerCase() === "subject",
          )?.value ?? "No Subject";
        const from =
          fullMessage.data.payload.headers?.find(
            (header) => header.name?.toLowerCase() === "from",
          )?.value ?? "Unknown Sender";
        const date =
          fullMessage.data.payload.headers?.find(
            (header) => header.name?.toLowerCase() === "date",
          )?.value ?? "Unknown Date";

        // Extract email body (assuming plain text for simplicity)
        let body = "";
        if (fullMessage.data.payload.parts) {
          const textPart = fullMessage.data.payload.parts.find(
            (part) => part.mimeType === "text/plain",
          );
          if (textPart?.body?.data) {
            body = Buffer.from(textPart.body.data, "base64").toString("utf-8");
          }
        } else if (fullMessage.data.payload.body?.data) {
          body = Buffer.from(
            fullMessage.data.payload.body.data,
            "base64",
          ).toString("utf-8");
        }

        void logtail.info("PARSED EMAIL", {
          subject,
          from,
          date,
          body,
          timestamp: new Date().toISOString(),
        });
      }
    }
  } catch (error) {
    console.error("Error fetching message:", error);
    void logtail.error("Error fetching message", { error });
  }
}
