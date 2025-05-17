import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center min-h-screen max-w-screen-3xl mx-auto items-center">
      {children}
    </div>
  );
}
