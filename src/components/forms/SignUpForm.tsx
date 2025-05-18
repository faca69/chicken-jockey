import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User } from "lucide-react";
import Link from "next/link";
import UserForm from "./UserForm";
import CompanyForm from "./CompanyForm";

export function SignUpForm() {
  return (
    <Card
      className="w-full max-w-md"
      style={{ border: "none", backgroundColor: "transparent" }}
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Choose your account type to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jobseeker" className="max-w-md">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="jobseeker" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobseeker">
            <UserForm />
          </TabsContent>

          <TabsContent value="company">
            <CompanyForm />
          </TabsContent>
        </Tabs>
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-primary underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
