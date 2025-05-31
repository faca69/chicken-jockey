"use client";

import Link from "next/link";
import {
  LogOut,
  Settings,
  User,
  Monitor,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const isUser = session?.user?.role === "USER";
  const profileLink = isUser
    ? `/user/${session?.user?.id}`
    : `/company/${session?.user?.id}`;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess() {
          router.push("/auth/sign-in");
          toast.success("Signed out successfully");
        },
        onError(context) {
          toast.error(context.error.message);
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-9">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary ">Frontend.mk</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
              asChild
            >
              <Link href="/jobs">Jobs</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary"
              asChild
            >
              <Link href="/companies">Companies</Link>
            </Button>

            {!session?.user ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {session?.user?.role === "COMPANY" && (
                  <Button variant="ghost" asChild>
                    <Link href="/jobs/new">Create Job</Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session?.user.image || ""}
                          alt={session?.user.name || "User"}
                        />
                        <AvatarFallback>
                          {session?.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-background"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={profileLink} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span className="ml-2">Theme</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="mr-2 h-4 w-4" />
                            System default
                            {theme === "system" && (
                              <Check className="ms-2 h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                            {theme === "light" && (
                              <Check className="ms-2 h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                            {theme === "dark" && (
                              <Check className="ms-2 h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <div className="flex flex-col space-y-1">
                    <div className="w-4 h-0.5 bg-current"></div>
                    <div className="w-4 h-0.5 bg-current"></div>
                    <div className="w-4 h-0.5 bg-current"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background" align="end">
                <DropdownMenuItem asChild>
                  <Link href="/companies">Companies</Link>
                </DropdownMenuItem>
                {session?.user?.role === "COMPANY" && (
                  <DropdownMenuItem asChild>
                    <Link href="/jobs/new">Create Job</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/jobs">Jobs</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {!session?.user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/sign-in">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/sign-up">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={session?.user.image || ""}
                            alt={session?.user.name || "User"}
                          />
                          <AvatarFallback>
                            {session?.user.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {session?.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session?.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={profileLink}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span className="ml-2">Theme</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Monitor className="mr-2 h-4 w-4" />
                            System default
                            {theme === "system" && (
                              <Check className="ms-2 h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                            {theme === "light" && (
                              <Check className="ms-2 h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                            {theme === "dark" && (
                              <Check className="ms-2 h-4 w-4" />
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
