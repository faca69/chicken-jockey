"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JobsWithComapnyInfoForJobCards } from "@/common/types/job.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface JobcardProps {
  job: JobsWithComapnyInfoForJobCards;
  currentUserId: string;
}

function JobCard({ job, currentUserId }: JobcardProps) {
  const router = useRouter();
  const isOwner = currentUserId && job.company.userId === currentUserId;

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/jobs/${job.id}/edit`);
  };

  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300  border-l-4 border-l-transparent hover:border-l-blue-500 hover:scale-[1.02]">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          <Link href={`/jobs/${job.id}`} className="hover:underline">
            {job.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
          {job.description}
        </CardDescription>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/company/${job.company.userId}`}
            className="hover:underline"
          >
            <span className="text-sm text-gray-500 font-medium">
              {job.company.companyName}
            </span>
            <span>
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={job.company.companyLogo || ""}
                  alt={`${job.company.companyName} logo`}
                />
                <AvatarFallback>
                  {job.company.companyName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </span>
          </Link>
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
  );
}

export default JobCard;
