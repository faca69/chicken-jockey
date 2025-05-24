"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);
    try {
      await signOut({
        fetchOptions: {
          onError(context) {
            toast.error(context.error.message);
          },
          onSuccess() {
            toast.success("Signed out successfully");
            router.push("/auth/sign-in");
            router.refresh();
          },
        },
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button onClick={handleSignOut} disabled={isPending} variant="destructive">
      {isPending ? "Signing Out..." : "Sign Out"}
    </Button>
  );
}

export default SignOutButton;
