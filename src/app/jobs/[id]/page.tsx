import { prisma } from "@/lib/prisma";

type JobPageProps = {
  params: {
    id: string;
  };
};

const JobPage = async ({ params }: JobPageProps) => {
  const { id } = await params;

  const singleJob = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!singleJob) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h1> JOB ID: {singleJob.id}</h1>
      <h1> JOB TITLE: {singleJob.title}</h1>
      <h1> JOB DESCRIPTION: {singleJob.description}</h1>
      <h1> CREATED AT: {singleJob.createdAt.toLocaleDateString()}</h1>
      <h1> UPDATED AT: {singleJob.updatedAt.toLocaleDateString()}</h1>
      <h1> COMPANY ID: {singleJob.companyId}</h1>
      <h1> JOB TYPE: {singleJob.jobType}</h1>
      <h1> JOB EXPERIENCE: {singleJob.experience}</h1>
      <h1> JOB WORK FROM: {singleJob.workFrom}</h1>
      <h1>
        {" "}
        JOB APPLICATION DEADLINE:{" "}
        {singleJob.applicationDeadline?.toLocaleDateString()}
      </h1>
      <h1> JOB CONTACT EMAIL: {singleJob.contactEmail}</h1>
      <h1> JOB CONTACT PHONE: {singleJob.contactPhone}</h1>
    </div>
  );
};

export default JobPage;
