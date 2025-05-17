"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onError(context) {
          toast.error(context.error.message);
        },
        onSuccess() {
          toast.success("Signed out successfully");
          router.push("/auth/sign-in");
        },
        onRequest() {
          setIsPending(true);
        },
        onResponse() {
          setIsPending(false);
        },
      },
    });
  };

  return (
    <button onClick={handleSignOut} disabled={isPending}>
      {isPending ? "Signing Out..." : "Sign Out"}
    </button>
  );
}

export default SignOutButton;
