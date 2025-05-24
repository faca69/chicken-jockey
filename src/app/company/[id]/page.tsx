import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type CompanyPageProps = {
  params: {
    id: string;
  };
};

export default async function CompanyPage({ params }: CompanyPageProps) {

  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  return <div>CompanyPage - {id}</div>;
};  