import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers()
  });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
} 