import { logtail } from "@/config/logtail-config";
import { getClient } from "@/utils/gmail";
import { gmail_v1 } from "@googleapis/gmail";
import { type Credentials } from "google-auth-library";

export async function startGmailWatch(credentials: Credentials) {
  // 1. Set up OAuth2 client
  const oauth2Client = getClient({
    accessToken: credentials.access_token ?? undefined,
    refreshToken: credentials.refresh_token ?? undefined,
  });

  // 3. Set up Gmail watch
  const gmailClient = new gmail_v1.Gmail({
    auth: oauth2Client,
  });

  try {
    const res = await gmailClient.users.watch({
      userId: "me",
      requestBody: {
        topicName: "projects/gregwire/topics/gmail-notifications",
        labelIds: ["INBOX"],
      },
    });

    void logtail.info("Successfully set up watch", {
      res,
      timestamp: new Date().toISOString(),
    });

    console.log("Watch setup successfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error setting up watch:", error);
    throw error;
  } finally {
    await logtail.flush();
  }
}
