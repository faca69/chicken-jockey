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
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";

export default function CompanyForm() {
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const loadingText = <span className="animate-pulse">Signing Up...</span>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const companyName = formData.get("companyName") as string;
    const industry = formData.get("industry") as string;
    const email = formData.get("companyEmail") as string;
    const password = formData.get("password") as string;

    if (!companyName || !industry || !email || !password || !logoFile) {
      toast.error("All fields are required");
      setIsPending(false);
      return;
    }

    try {
      // Upload logo file to get URL
      let companyLogo = "";
      if (logoFile) {
        const uploadResult = await startUpload([logoFile]);
        if (!uploadResult || uploadResult.length === 0) {
          throw new Error("Failed to upload company logo");
        }
        companyLogo = uploadResult[0].url;
      }

      const signUpResult = await authClient.signUp.email({
        email,
        password,
        image: companyLogo,
        name: companyName,
        role: "COMPANY",
      });

      if (signUpResult.data?.user) {
        const createCompanyResult = await createCompany({
          companyName,
          industry,
          userId: signUpResult.data.user.id,
          companyLogo,
        });

        if (createCompanyResult.error) {
          console.error("Company creation error:", createCompanyResult.error);
          toast.error(`Error creating company: ${createCompanyResult.error}`);
        } else {
          toast.success("Sign up successful");
          router.push("/auth/sign-up/success");
        }
      } else {
        console.error("User creation successful but user data is missing");
        toast.error("User creation successful but user data is missing");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      const err = error as { code?: string; message?: string };
      if (err.code === "USER_ALREADY_EXISTS") {
        toast.error("User already exists");
      } else {
        toast.error(`Failed to sign up: ${err.message || "Unknown error"}`);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="my-8 max-w-md" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="companyLogo">Company Logo</Label>
        <Input
          id="companyLogo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {logoPreview && (
          <div className="mt-2 flex items-center justify-center">
            <Image
              width={80}
              height={80}
              src={logoPreview}
              alt="Company Logo Preview"
              className="object-cover rounded-md"
            />
          </div>
        )}
      </LabelInputContainer>
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
        disabled={isPending || isUploading}
        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
        type="submit"
      >
        {isPending || isUploading ? loadingText : "Sign Up"}
        <BottomGradient />
      </button>
    </form>
  );
}
