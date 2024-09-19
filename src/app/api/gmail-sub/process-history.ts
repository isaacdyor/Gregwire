import { logtail } from "@/config/logtail-config";
import { api } from "@/trpc/server";
import { getGmailClient } from "@/utils/gmail";

export async function processHistory(historyId: string, email: string) {
  try {
    const integration = await api.integrations.getByEmail({
      email,
    });

    if (!integration?.refreshToken) {
      console.error("No refresh token:", email);
      void logtail.error("Integration not found for email", { email });
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

    await api.integrations.update({
      integration: {
        recentHistoryId: historyId,
      },
      integrationId: integration.id,
    });

    void logtail.info("Here is the history", {
      history,
      timestamp: new Date().toISOString(),
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
          email: {
            messageId: message.id,
            subject,
            from,
            date: new Date(date),
            body,
            receivedAt: new Date(),
            processed: false,
            integration: {
              connect: {
                email,
              },
            },
          },
          integrationEmail: email,
        });
        console.log(newEmail);
      }
    }
  } catch (error) {
    console.error("Error fetching message:", error);
  }
}
