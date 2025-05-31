import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth-helpers";
import { getCompaniesJobs, getCompanyByUserId } from "@/lib/db-functions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Edit, Mail, Phone, Globe, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type CompanyPageProps = {
  params: {
    id: string;
  };
};

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = await params;
  const session = await getSession();

  const company = await getCompanyByUserId(id);

  if (!company) {
    redirect("/companies");
  }

  const jobs = await getCompaniesJobs(company.id);
  const isCompanyHimself = session?.user.id === company?.userId;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <Card className="mb-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-md ring-4 ring-background">
                <Image
                  width={128}
                  height={128}
                  src={company.companyLogo}
                  alt={`${company.companyName} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {company.companyName}
                  </h1>
                  <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                    <Building2 className="w-4 h-4 mr-2" />
                    {company.industry}
                  </Badge>
                </div>

                {isCompanyHimself && (
                  <Link href={`/companies/${id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Details */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Contact Information
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {company.email && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Email
                  </p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-primary hover:text-primary/80 hover:underline"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            )}

            {company.phone && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Phone
                  </p>
                  <a
                    href={`tel:${company.phone}`}
                    className="text-primary hover:text-primary/80 hover:underline"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>
            )}

            {company.website && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Website
                  </p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location & Additional Info */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Location & Details
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {company.location && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Location
                  </p>
                  <p className="text-foreground">{company.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Industry
                </p>
                <p className="text-foreground">{company.industry}</p>
              </div>
            </div>

            {/* Placeholder for additional info */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect with us to learn more about our services and how we can
                help your business grow.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats or Additional Section */}
      <Card className="mt-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="p-4">
              <div className="text-2xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <Card className="mt-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">
            Open Positions
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {job.location}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.jobType}</Badge>
                      {job.salary && (
                        <Badge variant="outline">{job.salary}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="default" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {jobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No open positions at the moment
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
