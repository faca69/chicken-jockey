import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { editUserAction } from "@/actions/edit-user.action";

type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserEditPage({ params }: UserPageProps) {
  const { id } = await params;

  const userByUserID = await prisma.jobseeker.findUnique({
    where: {
      userId: id,
    },
  });

  console.log(userByUserID);
  return (
    <div>
      UserEditPage {userByUserID?.userId} {userByUserID?.fullName}
      <form action={editUserAction}>
        <Input
          type="text"
          placeholder="Full Name"
          defaultValue={userByUserID?.fullName}
          name="fullName"
        />
        <Input
          type="email"
          placeholder="Email"
          defaultValue={userByUserID?.email ?? ""}
          name="email"
        />
        <Input
          type="text"
          placeholder="Phone"
          defaultValue={userByUserID?.phone ?? ""}
          name="phone"
        />
        <Input
          type="text"
          placeholder="Location"
          defaultValue={userByUserID?.location ?? ""}
          name="location"
        />
        <input name="id" type="hidden" value={id} />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
