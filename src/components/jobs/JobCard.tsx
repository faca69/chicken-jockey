"use client";
import { Job } from "@/generated/prisma";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface JobWithCompany extends Job {
  company: {
    id: string;
    userId: string;
    companyName: string;
  };
}

interface JobCardProps {
  job: JobWithCompany;
  currentUserId?: string;
}

function JobCard({ job, currentUserId }: JobCardProps) {
  const router = useRouter();
  const isOwner = currentUserId && job.company.userId === currentUserId;

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/jobs/${job.id}/edit`);
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500 hover:scale-[1.02]">
        <CardHeader className="space-y-3">
          <CardTitle className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {job.title}
          </CardTitle>
          <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
            {job.description}
          </CardDescription>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-500 font-medium">
              {job.company.companyName}
            </span>
            <span className="text-sm text-blue-600 font-semibold">
              View Details →
            </span>
          </div>
          {isOwner && (
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleEditClick}
                className="text-sm text-green-600 font-semibold hover:text-green-700 transition-colors"
              >
                Edit Job →
              </button>
            </div>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}

export default JobCard;
