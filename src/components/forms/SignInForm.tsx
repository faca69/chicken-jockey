"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import LabelInputContainer from "@/components/LabelInputContainer";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import BottomGradient from "../BottomGradient";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const loadingSignIn = <span className="animate-pulse">Signing In...</span>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    await signIn.email({
      email,
      password,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx: { error: { message: string; code?: string } }) => {
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            router.push("/auth/verify?error=email_not_verified");
          } else {
            toast.error(ctx.error.message);
          }
        },
        onSuccess: () => {
          toast.success("Signed in successfully");
          router.push("/jobs");
        },
      },
    });
  };
  return (
    <div className="shadow-input mx-auto w-full rounded-none p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to your account to continue
      </p>

      <form className="my-8 w-sm" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="john@doe.com"
            name="email"
            type="email"
            autoComplete="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="current-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeOffIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </LabelInputContainer>
        <button
          disabled={isPending}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {isPending ? loadingSignIn : "Sign In"}
          <BottomGradient />
        </button>
        <div className="text-sm text-center p-5">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-primary underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
