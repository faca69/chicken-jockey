import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");
  return (
    <div className="bg-red-400">
      <h1>Profile</h1>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
