import { Company } from "@/generated/prisma";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

function CompanyCard({ company }: { company: Company }) {
  return (
    <Link href={`/company/${company.userId.toString()}`}>
      <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{company.companyName}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Temporibus, quisquam?
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default CompanyCard;
