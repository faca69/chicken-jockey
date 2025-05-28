"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <Button
        variant="secondary"
        className="group"
        onClick={() => router.back()}
      >
        <ArrowLeft
          className="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Go back
      </Button>
      <Link href="/jobs">
        <Button className="-order-1 sm:order-none">Go to Jobs</Button>
      </Link>
    </>
  );
}
