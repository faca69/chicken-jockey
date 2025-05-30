"use client";

import CompanyCard from "./CompanyCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CompaniesPage } from "@/common/types/company.types";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ListCompanies = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["company-feed"],
    queryFn: ({ pageParam }) =>
      axios.get<CompaniesPage>("/api/companies", {
        params: pageParam ? { cursor: pageParam } : {},
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  });

  const companies = data?.pages.flatMap((page) => page.data.companies) || [];

  if (status === "pending")
    return <div className="text-center py-8">Loading...</div>;

  if (status === "success" && !companies.length && !hasNextPage)
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );

  if (status === "error")
    return (
      <p className="text-center text-destructive">
        An error occurred while loading companies.
      </p>
    );

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default ListCompanies;
