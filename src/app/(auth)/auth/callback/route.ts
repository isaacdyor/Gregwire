import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";
import { api } from "@/trpc/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const userData: { id: string; name?: string } = {
        id: data.user.id,
      };

      if (
        data.user.user_metadata &&
        typeof data.user.user_metadata === "object" &&
        "full_name" in data.user.user_metadata &&
        typeof data.user.user_metadata.full_name === "string"
      ) {
        userData.name = data.user.user_metadata.full_name;
      }

      const existingUser = await api.users.getById(userData.id);
      if (!existingUser) {
        await api.users.create(userData);
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
