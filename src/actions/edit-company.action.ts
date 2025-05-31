"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editCompanyAction(formData: FormData) {
  const companyName = formData.get("companyName") as string;
  const industry = formData.get("industry") as string;
  const website = formData.get("website") as string;
  const location = formData.get("location") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const id = formData.get("id") as string;

  await prisma.company.update({
    where: { userId: id },
    data: { companyName, industry, website, location, phone, email },
  });

  revalidatePath(`/companies/${id}`);
  redirect(`/companies/${id}`);
}
