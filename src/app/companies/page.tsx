import ListCompanies from "@/components/company/ListCompanies";

const Companies = async () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Browse Companies</h1>
      <ListCompanies />
    </div>
  );
};

export default Companies;
