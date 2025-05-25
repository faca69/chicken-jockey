import { getCompanies } from "@/lib/db-functions";
import CompanyCard from "./CompanyCard";

const ListCompanies = async () => {
  const companies = await getCompanies();
  return (
    <div>
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default ListCompanies;
