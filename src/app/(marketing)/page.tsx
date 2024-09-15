import { getUser } from "@/lib/supabase/server";

export default async function Home() {
  const { user } = await getUser();
  return (
    <div>
      <p>hello {user?.email}</p>
    </div>
  );
}
