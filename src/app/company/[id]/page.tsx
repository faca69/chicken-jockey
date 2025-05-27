import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth-helpers";
import { getCompanyByUserId } from "@/lib/db-functions";
import Link from "next/link";
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

  const isCompanyHimself = session.user.id === company?.userId;

  return (
    <div>
      <div>
        {isCompanyHimself && (
          <Link href={`/company/${id}/edit`}>
            <Button>Edit Company</Button>
          </Link>
        )}
        <h1>Company Name: {company?.companyName}</h1>
        <h1>Company ID: {company?.userId}</h1>
      </div>
    </div>
  );
}
