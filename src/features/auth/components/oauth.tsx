"use client";

import { Logos } from "@/components/logos";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { createClient } from "@/lib/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import React from "react";

type OAuthProvider = {
  name: Provider;
  logo: keyof typeof Logos;
};

const providers: OAuthProvider[] = [
  {
    name: "google",
    logo: "google",
  },
  {
    name: "github",
    logo: "github",
  },
];

export const OAuthProviders: React.FC = () => {
  const supabase = createClient();

  const handleLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
      },
    });
    if (error) {
      console.error("OAuth error", error);
    }
  };

  return (
    <>
      {providers.map((provider) => {
        const Logo = Logos[provider.logo ?? "google"];
        return (
          <Button
            key={provider.name}
            variant="outline"
            className="mb-2 w-full font-normal text-muted-foreground"
            onClick={() => handleLogin(provider.name)}
          >
            <div className="flex items-center gap-2">
              <Logo className="h-5 w-5" />
              <p>
                Sign in with{" "}
                {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
              </p>
            </div>
          </Button>
        );
      })}
    </>
  );
};
