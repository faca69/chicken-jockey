"use server";

import { getSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { JobType } from "@/generated/prisma";
import { Experience } from "@/generated/prisma";
import { WorkFrom } from "@/generated/prisma";

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const benefits = formData.get("benefits") as string;
  const experience = formData.get("experience") as Experience;
  const jobType = formData.get("jobType") as JobType;
  const workFrom = formData.get("workFrom") as WorkFrom;
  const urgent = Boolean(formData.get("urgent"));
  const applicationDeadlineString = formData.get(
    "applicationDeadline"
  ) as string;
  const contactEmail = formData.get("contactEmail") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const workingHours = formData.get("workingHours") as string;

  const applicationDeadline = applicationDeadlineString
    ? new Date(applicationDeadlineString)
    : null;

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
      location,
      salary,
      benefits,
      experience,
      jobType,
      workFrom,
      urgent,
      applicationDeadline,
      contactEmail,
      contactPhone,
      workingHours,
    },
  });

  revalidatePath("/jobs", "page");
  redirect("/jobs");
}
