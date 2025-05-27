import { createJob } from "@/actions/create-job.action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CreateJobForm = async () => {
  return (
    <form action={createJob} className="flex flex-col gap-4">
      <Input required type="text" name="title" placeholder="Job Title" />
      <Input
        required
        type="text"
        name="description"
        placeholder="Job Description"
      />
      <Input required type="text" name="location" placeholder="Job Location" />
      <Input type="text" name="salary" placeholder="Job Salary" />
      <Input type="text" name="benefits" placeholder="Job Benefits" />
      <select
        required
        name="experience"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select Experience Level</option>
        <option value="ENTRY_LEVEL">Entry Level</option>
        <option value="MID_LEVEL">Mid Level</option>
        <option value="SENIOR_LEVEL">Senior Level</option>
      </select>
      <select
        required
        name="jobType"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select Job Type</option>
        <option value="FULL_TIME">Full Time</option>
        <option value="PART_TIME">Part Time</option>
        <option value="INTERNSHIP">Internship</option>
      </select>
      <select
        required
        name="workFrom"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select Work From</option>
        <option value="REMOTE">Remote</option>
        <option value="ON_SITE">On Site</option>
        <option value="HYBRID">Hybrid</option>
      </select>
      <div className="flex items-center space-x-2">
        <input type="checkbox" name="urgent" id="urgent" className="h-4 w-4" />
        <label htmlFor="urgent" className="text-sm font-medium">
          Mark as urgent
        </label>
      </div>
      <Input
        type="date"
        name="applicationDeadline"
        placeholder="Job Application Deadline"
      />

      <Input type="email" name="contactEmail" placeholder="Job Contact Email" />
      <Input type="tel" name="contactPhone" placeholder="Job Contact Phone" />

      <Input type="text" name="workingHours" placeholder="Job Working Hours" />

      <Button type="submit">Create Job</Button>
    </form>
  );
};
export default CreateJobForm;
