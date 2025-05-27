import ListJobs from "@/components/jobs/ListJobs";

const Jobs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Jobs</h1>
      <ListJobs />
    </div>
  );
};

export default Jobs;
