import { createJob } from "@/actions/create-job.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubmitJobMutation = () => {
  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create job");
    },
  });

  return mutation;
};
