import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "@/components/SignOutButton";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");
  return (
    <div>
      <h1>Profile</h1>

      <SignOutButton />

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
