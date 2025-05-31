import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Home,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Mail,
  Phone,
  Gift,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatDeadline } from "@/lib/utils";

type JobPageProps = {
  params: {
    id: string;
  };
};

const JobPage = async ({ params }: JobPageProps) => {
  const { id } = await params;

  const singleJob = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!singleJob) {
    return <div>Job not found</div>;
  }

  return (
    <Card
      className={`w-full max-w-2xl mx-auto transition-all duration-200 hover:shadow-lg`}
    >
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {singleJob.title}
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              {singleJob.companyId}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {singleJob.jobType}
            </Badge>
            <Badge className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              {singleJob.experience}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Home className="w-3 h-3" />
              {singleJob.workFrom}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{singleJob.location}</span>
          </div>
          {singleJob.salary && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>{singleJob.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{singleJob.workingHours}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Apply by {formatDeadline(singleJob.applicationDeadline)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {singleJob.description}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Benefits
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {singleJob.benefits}
          </p>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="font-semibold">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a
                href={`mailto:${singleJob.contactEmail}`}
                className="text-primary hover:underline break-all"
              >
                {singleJob.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <a
                href={`tel:${singleJob.contactPhone}`}
                className="text-primary hover:underline"
              >
                {singleJob.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-auto" size="lg">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobPage;
