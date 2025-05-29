// "use client";

// import type React from "react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import type { JobsWithComapnyInfoForJobCards } from "@/common/types/job.types";
// import { ArrowUpRight, Briefcase, MapPin, PenLine } from "lucide-react";

interface JobcardProps {
  job: JobsWithComapnyInfoForJobCards;
  currentUserId: string;
}

// function JobCard({ job, currentUserId }: JobcardProps) {
//   const router = useRouter();
//   const isOwner = currentUserId && job.company.userId === currentUserId;

//   const handleEditClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     router.push(`/jobs/${job.id}/edit`);
//   };

//   return (
//     <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-gray-200">
//       {/* Accent border */}
//       <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

//       <div className="p-6">
//         {/* Header with title and company logo */}
//         <div className="flex items-start justify-between mb-3">
//           <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
//             <Link
//               href={`/jobs/${job.id}`}
//               className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
//             >
//               {job.title}
//             </Link>
//           </h3>
//           <Link
//             href={`/company/${job.company.userId}`}
//             className="shrink-0 ml-4"
//           >
//             <Avatar className="h-12 w-12 border-2 border-gray-100 shadow-sm transition-all duration-300 group-hover:border-purple-100 group-hover:shadow">
//               <AvatarImage
//                 src={job.company.companyLogo || ""}
//                 alt={`${job.company.companyName} logo`}
//               />
//               <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700">
//                 {job.company.companyName.charAt(0)}
//               </AvatarFallback>
//             </Avatar>
//           </Link>
//         </div>

//         {/* Company name */}
//         <Link
//           href={`/company/${job.company.userId}`}
//           className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-purple-700 mb-3"
//         >
//           <Briefcase className="h-4 w-4" />
//           {job.company.companyName}
//         </Link>

//         {/* Description */}
//         <p className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">
//           {job.description}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//           <div className="flex items-center gap-2">
//             <Badge
//               variant="outline"
//               className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
//             >
//               <MapPin className="h-3 w-3 mr-1" />
//               Remote
//             </Badge>
//           </div>

//           <div className="flex items-center gap-3">
//             {isOwner && (
//               <button
//                 onClick={handleEditClick}
//                 className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
//               >
//                 <PenLine className="h-3.5 w-3.5 mr-1" />
//                 Edit
//               </button>
//             )}
//             <Link
//               href={`/jobs/${job.id}`}
//               className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
//             >
//               View
//               <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default JobCard;

import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobsWithComapnyInfoForJobCards } from "@/common/types/job.types";
import { useRouter } from "next/router";
import { calculateDaysRemaining } from "@/lib/utils";

interface JobCardProps {
  job: JobsWithComapnyInfoForJobCards;
  currentUserId: string;
}

export default function JobCard({ job, currentUserId }: JobCardProps) {
  const daysRemaining = calculateDaysRemaining(job.applicationDeadline);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-muted">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/80" />
        <Image
          src={job.image || "/placeholder.svg"}
          alt={`${job.company} job`}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge
            variant={daysRemaining <= 7 ? "destructive" : "secondary"}
            className="font-medium"
          >
            <CalendarIcon className="h-3 w-3 mr-1" />
            {daysRemaining <= 0 ? "Expired" : `${daysRemaining} days left`}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
          <Image
            src={job.image || "/placeholder.svg"}
            alt={job.company}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
      <CardContent className="pt-6">
        <h3 className="font-semibold text-xl line-clamp-1">{job.title}</h3>
        <p className="text-muted-foreground">{job.company}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>Apply by {formatDeadline(job.deadline)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm">
          Save
        </Button>
        <Button size="sm">Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
