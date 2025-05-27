import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

type UserPageProps = {
  params: {
    id: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.jobseeker.findUnique({
    where: {
      userId: id as string,
    },
  });
  const isUserHimself = session?.user?.id === user?.userId;
  console.log(isUserHimself);
  if (!session) redirect("/auth/sign-in");

  return (
    <div>
      {isUserHimself && (
        <Link href={`/user/${id}/edit`}>
          <Button>Edit Profile</Button>
        </Link>
      )}
      <h1>User ID: {user?.userId}</h1>
      <h1>User Name: {user?.fullName}</h1>
    </div>
  );
}
