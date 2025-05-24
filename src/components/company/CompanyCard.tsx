import { Company } from "@/generated/prisma";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle>{company.companyName}</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus,
          quisquam?
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default CompanyCard;
