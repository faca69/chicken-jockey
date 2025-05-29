import { z } from "zod";

export const jobFormSchema = z.object({
  title: z
    .string()
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters"),
  description: z
    .string()
    .min(50, "Job description must be at least 50 characters")
    .max(2000, "Job description must be less than 2000 characters"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  benefits: z.string().optional(),
  experience: z.enum(["ENTRY_LEVEL", "MID_LEVEL", "SENIOR_LEVEL"], {
    required_error: "Please select an experience level",
  }),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP"], {
    required_error: "Please select a job type",
  }),
  workFrom: z.enum(["REMOTE", "ON_SITE", "HYBRID"], {
    required_error: "Please select work arrangement",
  }),
  urgent: z.boolean().default(false),
  applicationDeadline: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().optional(),
  workingHours: z.string().optional(),
});
