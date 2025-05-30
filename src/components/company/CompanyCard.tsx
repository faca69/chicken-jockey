import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CompanyWithJobCount } from "@/common/types/company.types";
import Link from "next/link";

export default function CompanyCard({
  company,
}: {
  company: CompanyWithJobCount;
}) {
  return (
    <Link href={`/company/${company.userId}`}>
      <Card
        className={`group cursor-pointer transition-all duration-200 hover:shadow-lg`}
      >
        <CardContent className="">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Company Logo */}
            <div className="size-48 rounded-lg bg-muted flex items-center justify-center overflow-hidden relative">
              {company.companyLogo ? (
                <Image
                  fill
                  quality={45}
                  src={company.companyLogo || ""}
                  alt={`${company.companyName} logo`}
                  className="object-cover object-center"
                />
              ) : (
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors truncate">
                {company.companyName}
              </h3>
            </div>

            {/* Job Count */}
            <Badge variant="secondary" className="text-sm">
              {company._count.jobs} {company._count.jobs === 1 ? "job" : "jobs"}{" "}
              available
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
