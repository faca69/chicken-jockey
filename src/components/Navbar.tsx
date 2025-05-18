"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes("/auth");

  return (
    <>
      {isAuthPage ? null : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">Home</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
