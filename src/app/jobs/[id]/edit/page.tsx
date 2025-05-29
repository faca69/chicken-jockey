import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { editJob } from "@/actions/jobs/edit-job.action";

type EditJobPageProps = {
  params: {
    id: string;
  };
};

const EditJobPage = async ({ params }: EditJobPageProps) => {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
  });

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h1>Edit Job</h1>

      <div>
        <form action={editJob}>
          <Input type="text" name="title" defaultValue={job.title} />
          <Input
            type="text"
            name="description"
            defaultValue={job.description}
          />
          <Input type="text" name="location" defaultValue={job.location} />
          <Input type="text" name="salary" defaultValue={job.salary || ""} />
          <input type="hidden" name="id" value={job.id} />
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
