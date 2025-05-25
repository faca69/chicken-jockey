"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import LabelInputContainer from "@/components/LabelInputContainer";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import BottomGradient from "../BottomGradient";
import { userSignUpFunction } from "@/actions/user-sign-up.action";

export default function UserForm() {
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loadingText = <span className="animate-pulse">Signing Up...</span>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const { error } = await userSignUpFunction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Sign up successful");
      window.location.href = "/auth/sign-up/success";
    }

    setIsPending(false);
  };
  return (
    <form className="my-8 max-w-md" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="name"> FullName</Label>
        <Input
          id="name"
          placeholder="John Doe"
          name="name"
          type="text"
          autoComplete="name"
        />
      </LabelInputContainer>
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
            autoComplete="new-password"
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
        {isPending ? loadingText : "Sign Up"}
        <BottomGradient />
      </button>
    </form>
  );
}
