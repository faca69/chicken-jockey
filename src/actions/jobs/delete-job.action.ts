"use server";

import { getSession } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function deleteJob(id: string) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.companyId !== session?.user?.id) {
    throw new Error("You are not authorized to delete this job");
  }

  await prisma.job.delete({
    where: {
      id,
    },
  });
}
