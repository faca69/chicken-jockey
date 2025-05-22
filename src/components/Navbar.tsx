import Link from "next/link";
import { Menu, User, LogOut, Settings, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { headers as getHeaders } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";
// import UserAvatarNav from "./UserAvatarNav";

const Navbar = async () => {
  const headers = await getHeaders();
  const pathname = headers.get("x-pathname");
  const session = await auth.api.getSession({ headers });
  console.log(session);

  const navItems = [
    { label: "Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="font-semibold text-xl">
            Frontend.mk
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <SignOutButton />
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            // <UserAvatarNav />
            <pre>logge d in</pre>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden md:inline-flex">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="hidden md:inline-flex">
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                {session?.user ? (
                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex items-center gap-2 py-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src="/placeholder.svg?height=36&width=36"
                          alt="User"
                        />
                        <AvatarFallback>
                          <UserCircle className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Your Account</span>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-sm py-2"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 text-sm py-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={() =>
                        signOut({
                          fetchOptions: {
                            onSuccess() {
                              toast.success("Signed out successfully");
                              redirect("/auth/login");
                            },
                          },
                        })
                      }
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-4">
                    <Button asChild variant="outline">
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/auth/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
