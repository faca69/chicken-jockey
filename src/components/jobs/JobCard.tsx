import { Job } from "@/generated/prisma";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default JobCard;
