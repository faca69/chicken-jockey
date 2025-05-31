"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import LabelInputContainer from "@/components/LabelInputContainer";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import BottomGradient from "../BottomGradient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createCompany } from "@/actions/company-create.action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function CompanyForm() {
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const loadingText = <span className="animate-pulse">Signing Up...</span>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const companyName = formData.get("companyName") as string;
    const industry = formData.get("industry") as string;
    const email = formData.get("companyEmail") as string;
    const password = formData.get("password") as string;

    if (!companyName || !industry || !email || !password) {
      toast.error("All fields are required");
      setIsPending(false);
      return;
    }

    try {
      const signUpResult = await authClient.signUp.email({
        email,
        password,
        name: companyName,
        role: "COMPANY",
      });

      if (signUpResult.data?.user) {
        const { error } = await createCompany({
          companyName,
          industry,
          userId: signUpResult.data.user.id,
        });

        if (error) {
          toast.error(error);
        } else {
          toast.success("Sign up successful");
          router.push("/auth/sign-up/success");
        }
      }
    } catch (error) {
      const err = error as { code?: string; message?: string };
      if (err.code === "USER_ALREADY_EXISTS") {
        toast.error("User already exists");
      } else {
        toast.error(err.message || "Failed to sign up");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="my-8 max-w-md" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Acme Inc."
          name="companyName"
          type="text"
          autoComplete="organization"
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="companyEmail">Company Email</Label>
        <Input
          id="companyEmail"
          placeholder="contact@acme.com"
          name="companyEmail"
          type="email"
          autoComplete="email"
        />
      </LabelInputContainer>
      <div className="space-y-2">
        <LabelInputContainer>
          <Label htmlFor="company-industry">Industry</Label>
          <Select required name="industry">
            <SelectTrigger className="w-full">
              <SelectValue
                className="placeholder-shown:text-muted-foreground"
                placeholder="Select industry"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </LabelInputContainer>
      </div>
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
