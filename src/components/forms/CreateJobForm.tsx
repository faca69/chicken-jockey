import { createJob } from "@/actions/create-job.action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CreateJobForm = async () => {
  return (
    <form action={createJob} className="flex flex-col gap-4">
      <Input type="text" name="title" placeholder="Job Title" />
      <Input type="text" name="description" placeholder="Job Description" />
      <Button type="submit">Create Job</Button>
    </form>
  );
};
export default CreateJobForm;
