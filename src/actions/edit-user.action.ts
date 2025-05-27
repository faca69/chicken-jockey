"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editUserAction(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const id = formData.get("id") as string;

  await prisma.jobseeker.update({
    where: {
      userId: id,
    },
    data: {
      fullName,
      email,
      phone,
      location,
    },
  });

  revalidatePath(`/user/${id}`);
  redirect(`/user/${id}`);
}
