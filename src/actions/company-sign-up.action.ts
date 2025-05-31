"use server";

import { auth, ErrorCode } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";

export async function companySignUpFunction(formData: FormData) {
  const companyName = formData.get("companyName") as string;
  if (!companyName) return { error: "Company Name is required" };

  const industry = formData.get("industry") as string;
  if (!industry) return { error: "Industry is required" };

  const email = formData.get("companyEmail") as string;
  if (!email) return { error: "Email is required" };

  const password = formData.get("password") as string;
  if (!password) return { error: "Password is required" };

  try {
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: companyName,
        role: "COMPANY",
      },
    });

    await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          companyName,
          industry,
          userId: user.user.id,
        },
      });

      if (!company) {
        throw new Error("Failed to create company");
      }
    });

    revalidatePath("/", "layout");
    return { error: null };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "User already exists" };
        default:
          return { error: err.message };
      }
    }
    return { error: "Internal server error" };
  }
}
