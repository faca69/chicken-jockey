// "use client";

// const SignInForm = () => {
//   const [isPending, setIsPending] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsPending(true);
//     const formData = new FormData(e.target as HTMLFormElement);

//     const { error } = await signInFnction(formData);

//     if (error) {
//       toast.error(error);
//       setIsPending(false);
//     } else {
//       toast.success("Signed in successfully");
//       router.push("/profile");
//     }

//     setIsPending(false);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" />
//         <input type="password" name="password" placeholder="Password" />
//         <button type="submit" disabled={isPending}>
//           {isPending ? "Signing In..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignInForm;

"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInFnction } from "@/actions/sign-in.action";
export default function SignInForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const loadingSignIn = <span className="animate-pulse">Signing In...</span>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const { error } = await signInFnction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Signed in successfully");
      router.push("/profile");
    }

    setIsPending(false);
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
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            name="password"
            type="password"
          />
        </LabelInputContainer>
        <button
          disabled={isPending}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {isPending ? loadingSignIn : "Sign In"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
