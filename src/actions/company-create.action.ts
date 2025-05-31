"use server";

import { prisma } from "@/lib/prisma";

type CreateCompanyParams = {
  companyName: string;
  industry: string;
  userId: string;
  companyLogo: string;
};

export async function createCompany(params: CreateCompanyParams) {
  try {
    const company = await prisma.company.create({
      data: {
        companyName: params.companyName,
        industry: params.industry,
        userId: params.userId,
        companyLogo: params.companyLogo,
      },
    });

    if (!company) {
      throw new Error("Failed to create company");
    }

    return { error: null };
  } catch (error) {
    console.error("Error creating company:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create company",
    };
  }
}
