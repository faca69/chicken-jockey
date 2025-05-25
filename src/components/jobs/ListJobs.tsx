"use client";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/generated/prisma";

const ListJobs = () => {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () => fetch("/api/jobs").then((res) => res.json()),
    select: (data) => data || [],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading jobs</div>;
  return (
    <div>
      {jobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default ListJobs;
