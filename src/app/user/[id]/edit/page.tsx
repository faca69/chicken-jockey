import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { editUserAction } from "@/actions/edit-user.action";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

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

  if (!userByUserID) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <ProfilePictureUpload
              currentImage={userByUserID.profilePicture}
              userName={userByUserID.fullName}
            />
          </div>

          <form action={editUserAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                defaultValue={userByUserID.fullName}
                name="fullName"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                defaultValue={userByUserID.email ?? ""}
                name="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Phone"
                defaultValue={userByUserID.phone ?? ""}
                name="phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Location"
                defaultValue={userByUserID.location ?? ""}
                name="location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                defaultValue={userByUserID.website ?? ""}
                name="website"
              />
            </div>

            <input name="id" type="hidden" value={id} />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
