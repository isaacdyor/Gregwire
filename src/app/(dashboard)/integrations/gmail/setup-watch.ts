import { env } from "@/env";
import { api } from "@/trpc/server";
import { gmail_v1 } from "@googleapis/gmail";
import { OAuth2Client, type Credentials } from "google-auth-library";

export async function connectGmail(userId: string, credentials: Credentials) {
  // 1. Set up OAuth2 client
  const oauth2Client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    `${env.NEXT_PUBLIC_APP_URL}/integrations/gmail`,
  );

  // 2. Set credentials (assuming you've already obtained these)
  oauth2Client.setCredentials({
    access_token: credentials.access_token,
    refresh_token: credentials.refresh_token,
  });

  // 3. Set up Gmail watch
  const gmailClient = new gmail_v1.Gmail({
    auth: oauth2Client,
  });

  try {
    const res = await gmailClient.users.watch({
      userId: "me",
      requestBody: {
        topicName: "projects/YOUR_PROJECT_ID/topics/YOUR_TOPIC_NAME",
        labelIds: ["INBOX"],
      },
    });

    // 4. Store watch expiration
    const expirationTime = new Date(parseInt(res.data.expiration!));

    await api.integrations.update({
      id: userId,
      watchExpiration: expirationTime,
    });

    console.log("Watch setup successfully", res.data);
    return res.data;
  } catch (error) {
    console.error("Error setting up watch:", error);
    throw error;
  }
}
