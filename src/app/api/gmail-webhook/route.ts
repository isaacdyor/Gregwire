import { PubSub } from "@google-cloud/pubsub";
import { type NextRequest } from "next/server";

// Create a PubSub client
const pubSubClient = new PubSub();

export async function POST(request: NextRequest) {
  try {
    const { pushEndpoint, topicNameOrId, subscriptionNameOrId } =
      await request.json();

    // Validate input
    if (!pushEndpoint || !topicNameOrId || !subscriptionNameOrId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const options = {
      pushConfig: {
        pushEndpoint,
      },
    };

    // Create the push subscription
    await pubSubClient
      .topic(topicNameOrId)
      .createSubscription(subscriptionNameOrId, options);

    return new Response(
      JSON.stringify({
        message: `Subscription ${subscriptionNameOrId} created.`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error creating push subscription:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create push subscription" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
