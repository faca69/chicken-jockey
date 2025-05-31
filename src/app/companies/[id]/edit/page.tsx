import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { editCompanyAction } from "@/actions/edit-company.action";

type CompanyEditPageProps = {
  params: {
    id: string;
  };
};

export default async function CompanyEditPage({
  params,
}: CompanyEditPageProps) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: {
      userId: id,
    },
  });
  return (
    <div>
      <h1>Company ID: {company?.userId}</h1>
      <h1>Company Name: {company?.companyName}</h1>
      <form action={editCompanyAction}>
        <Input
          type="text"
          placeholder="Company Name"
          defaultValue={company?.companyName}
          name="companyName"
        />
        <Input
          type="text"
          placeholder="Industry"
          defaultValue={company?.industry}
          name="industry"
        />
        <Input
          type="text"
          placeholder="Website"
          defaultValue={company?.website || ""}
          name="website"
        />
        <Input
          type="text"
          placeholder="Location"
          defaultValue={company?.location || ""}
          name="location"
        />
        <Input
          type="text"
          placeholder="Phone"
          defaultValue={company?.phone || ""}
          name="phone"
        />
        <Input
          type="text"
          placeholder="Email"
          defaultValue={company?.email || ""}
          name="email"
        />
        <input name="id" type="hidden" value={id} />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
