import Link from "next/link";

export default async function Integrations() {
  return (
    <div>
      <h1>Integrations</h1>
      <Link href="/integrations/new">Slack</Link>
    </div>
  );
}
