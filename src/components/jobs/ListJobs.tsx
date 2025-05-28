"use client";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { Experience, JobType, WorkFrom } from "@/generated/prisma";

interface JobWithCompany {
  id: string;
  title: string;
  description: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  salary: string;
  benefits: string;
  experience: Experience;
  jobType: JobType;
  contactEmail: string;
  contactPhone: string;
  workingHours: string;
  workFrom: WorkFrom;
  jobCategory: string;
  urgent: boolean;
  applicationDeadline: Date;
  company: {
    id: string;
    userId: string;
    companyName: string;
  };
}

const ListJobs = () => {
  const { data: session } = useSession();

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<JobWithCompany[]>({
    queryKey: ["jobs"],
    queryFn: () => fetch("/api/jobs").then((res) => res.json()),
    select: (data) => data || [],
  });

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading jobs</div>
    );

  return (
    <div>
      <h1>Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard key={job.id} job={job} currentUserId={session?.user?.id} />
        ))}
      </div>
    </div>
  );
};

export default ListJobs;
