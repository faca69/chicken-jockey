"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editJob(formData: FormData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const location = formData.get("location");
  const salary = formData.get("salary");

  if (!id || !title || !description || !location || !salary) {
    throw new Error("Missing required fields");
  }

  await prisma.job.update({
    where: { id: id as string },
    data: {
      title: title as string,
      description: description as string,
      location: location as string,
      salary: salary as string,
    },
  });

  revalidatePath(`/jobs/${id}`);
  revalidatePath("/jobs");
  redirect(`/jobs/${id}`);
}
