"use client";
import CompanyCard from "./CompanyCard";
import { useQuery } from "@tanstack/react-query";
import { Company } from "@/generated/prisma";

const ListCompanies = () => {
  const {
    data: companies,
    isLoading,
    isError,
  } = useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: () => fetch("/api/companies").then((res) => res.json()),
    select: (data) => data || [],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading companies</div>;
  return (
    <div>
      {companies?.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default ListCompanies;
