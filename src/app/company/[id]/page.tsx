import { getSession } from "@/lib/auth-helpers";
import { getCompanyById } from "@/lib/db-function";
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

  const company = await getCompanyById(id);

  if (!company) return <p>Company not found</p>;

  return <div>CompanyPage - {company?.companyName}</div>;
}
