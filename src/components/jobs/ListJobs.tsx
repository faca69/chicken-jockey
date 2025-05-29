"use client";
import JobCard from "./JobCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import axios from "axios";
import { JobsPage } from "@/lib/types";
import InfiniteScrollContainer from "../InfiniteScrollContainer";
import { Loader2 } from "lucide-react";

const ListJobs = () => {
  const { data: session } = useSession();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["job-feed"],
    queryFn: ({ pageParam }) =>
      axios.get<JobsPage>("/api/jobs", {
        params: pageParam ? { cursor: pageParam } : {},
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  });

  const jobs = data?.pages.flatMap((page) => page.data.jobs) || [];

  if (status === "pending")
    return <div className="text-center py-8">Loading...</div>;

  if (status === "success" && !jobs.length && !hasNextPage)
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );

  if (status === "error")
    return (
      <p className="text-center text-destructive">
        An error occurred while loading jobs.
      </p>
    );

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            currentUserId={session?.user?.id || ""}
          />
        ))}
      </div>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default ListJobs;
