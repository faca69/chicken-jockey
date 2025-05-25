"use server";

import { getSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const session = await getSession();

  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a job");
  }

  const company = await prisma.company.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!company) {
    throw new Error("You must have a company profile to create jobs");
  }

  await prisma.job.create({
    data: {
      title,
      description,
      companyId: company.id,
    },
  });

  revalidatePath("/jobs");
  redirect("/jobs");
}
