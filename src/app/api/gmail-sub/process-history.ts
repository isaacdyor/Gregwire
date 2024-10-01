import { api } from "@/trpc/server";
import { getGmailClient } from "@/utils/gmail";
import { type GmailIntegration } from "@prisma/client";

export async function processHistory(
  historyId: string,
  integration: GmailIntegration,
) {
  try {
    if (!integration?.refreshToken || !integration.recentHistoryId) {
      console.error("Invalid gmail integration", integration.email);
      return;
    }

    const gmail = getGmailClient({
      refreshToken: integration.refreshToken,
      accessToken: integration.accessToken,
    });

    const history = await gmail.users.history.list({
      userId: "me",
      startHistoryId: integration.recentHistoryId,
    });

    await api.gmail.update({
      id: integration.id,
      recentHistoryId: historyId,
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
        const emailExists = await api.emails.getByMessageId(message.id);
        if (emailExists) {
          return console.log("Email already exists");
        }
        const newEmail = await api.emails.create({
          messageId: message.id,
          subject,
          from,
          date: new Date(date),
          body,
          receivedAt: new Date(),
          processed: false,
          gmailIntegration: {
            connect: {
              email: integration.email,
            },
          },
        });
        console.log(newEmail);
      }
    }
  } catch (error) {
    console.error("Error fetching message:", error);
  }
}
