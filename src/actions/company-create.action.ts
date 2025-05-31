"use server";

import { prisma } from "@/lib/prisma";

type CreateCompanyParams = {
  companyName: string;
  industry: string;
  userId: string;
};

export async function createCompany(params: CreateCompanyParams) {
  try {
    await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          companyName: params.companyName,
          industry: params.industry,
          userId: params.userId,
        },
      });

      if (!company) {
        throw new Error("Failed to create company");
      }
    });

    return { error: null };
  } catch (error) {
    console.error("Error creating company:", error);
    return { error: "Failed to create company" };
  }
}
