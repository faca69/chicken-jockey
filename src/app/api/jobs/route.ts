import { prisma } from "@/lib/prisma";
import { jobDataInclude, JobsPage } from "@/common/types/job.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 12;

    const jobs = await prisma.job.findMany({
      include: jobDataInclude,
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = jobs.length > pageSize ? jobs[pageSize].id : null;

    const data: JobsPage = {
      jobs: jobs.slice(0, pageSize),
      nextCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
