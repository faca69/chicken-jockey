import Image from "next/image";
import { CalendarIcon, Edit2, MapPin, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobsWithComapnyInfoForJobCards } from "@/common/types/job.types";
import { useRouter } from "next/navigation";
import { calculateDaysRemaining } from "@/lib/utils";
import { BookmarkIcon } from "lucide-react";

interface JobCardProps {
  job: JobsWithComapnyInfoForJobCards;
  currentUserId: string;
}
export default function JobCard({ job, currentUserId }: JobCardProps) {
  const daysRemaining = calculateDaysRemaining(job.applicationDeadline);

  const renderCompanyOnlyButtons = (
    <>
      {currentUserId === job.company.userId && (
        <>
          <Button variant="ghost" size="icon">
            <Edit2 className="size-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="size-6" />
          </Button>
        </>
      )}
    </>
  );

  const router = useRouter();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-muted ">
        <Image
          src={job.company.companyLogo || ""}
          alt={`${job.company} job`}
          fill
          className="object-cover object-center"
          quality={40}
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant={daysRemaining <= 7 ? "destructive" : "secondary"}
            className="font-medium"
          >
            <CalendarIcon className="h-3 w-3 mr-1" />
            {daysRemaining <= 0
              ? "Expired"
              : `${daysRemaining} ${daysRemaining === 1 ? "day" : "days"} left`}
          </Badge>
        </div>
      </div>
      <CardContent>
        <h3 className="font-semibold text-xl truncate">{job.title}</h3>
        <p className="text-muted-foreground truncate">
          {job.company.companyName}
        </p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate w-full">{job.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t">
        <div className="flex items-center ">
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="size-6" />
          </Button>
          {renderCompanyOnlyButtons}
        </div>

        <Button size="sm" onClick={() => router.push(`/jobs/${job.id}`)}>
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
