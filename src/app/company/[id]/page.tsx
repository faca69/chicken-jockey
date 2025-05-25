import { getSession } from "@/lib/auth-helpers";
import { getCompanyByUserId } from "@/lib/db-functions";
import { redirect } from "next/navigation";

type CompanyPageProps = {
  params: {
    id: string;
  };
};

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/auth/sign-in");

  const company = await getCompanyByUserId(id);

  return <div>CompanyPage - {company?.companyName}</div>;
}
