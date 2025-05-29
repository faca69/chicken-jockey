import { deleteJob } from "@/actions/jobs/delete-job.action";
// import { Job } from "@/generated/prisma";
import { useMutation } from "@tanstack/react-query";

export function useDeleteJobMutation() {
  const mutation = useMutation({
    mutationFn: deleteJob,
  });

  return mutation;
}

//TODO: Add query client to invalidate jobs query, but first make the pages pretty
