import { SendVerificationEmailForm } from "@/components/forms/VerifyEmailForm";
import { redirect } from "next/navigation";
interface PageProps {
  searchParams: Promise<{ error: string }>;
}

async function VerifyPage({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) return redirect("/jobs");
  return (
    <div>
      <h1>Verify your email</h1>
      <p className="text-destructive">
        {error === "invalid_token" || error === "token_expired"
          ? "Your token is invalid or expired please request a new one."
          : error === "email_not_verified"
          ? "Please verify your email, or request a new verification below"
          : "Oops! Something went wrong. Please try again."}
      </p>
      <SendVerificationEmailForm />
    </div>
  );
}

export default VerifyPage;
