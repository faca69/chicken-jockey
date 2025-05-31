import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth-helpers";
import { getCompaniesJobs, getCompanyByUserId } from "@/lib/db-functions";
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

  if (!company) {
    redirect("/companies");
  }

  const jobs = await getCompaniesJobs(company.id);
  const isCompanyHimself = session.user.id === company?.userId;

  return (
    <div>
      <div>
        {isCompanyHimself && (
          <Link href={`/companies/${id}/edit`}>
            <Button>Edit Company</Button>
          </Link>
        )}
        <h1>Company Name: {company?.companyName}</h1>
        <h1>Company ID: {company?.userId}</h1>
        <h1>Company Industry: {company?.industry}</h1>
        <h1>Company Website: {company?.website}</h1>
        <h1>Company Location: {company?.location}</h1>
        <h1>Company Email: {company?.email}</h1>
        <h1>Company Phone: {company?.phone}</h1>

        <h1>Company Jobs:</h1>

        {jobs.map((job) => (
          <div key={job.id}>
            <h1>Job Title: {job.title}</h1>
            <h1>Job Description: {job.description}</h1>
            <h1>Job Location: {job.location}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
