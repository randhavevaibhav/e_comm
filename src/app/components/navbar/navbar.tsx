"use client";

import { useAuth } from "@/app/(routes)/auth/_auth-contexts/auth-context";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { DesktopMenuNav } from "./desktop-menu-nav";
import { MobileMenuNav } from "./mobile-menu-nav";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isAuthenticated = user ? true : false;

  const handleLogout = async () => {
    if (user) {
      const isSuccess = await logout(user?.id);
      if (isSuccess) {
        toast.success(`Logged out ! 😢`);
      }
    }
    return false;
  };

  const isPathExcluded = ["/auth"].includes(pathname);

  if (isPathExcluded) {
    return null;
  }
  return (
    <nav>
      {/* Desktop Menu */}
      <DesktopMenuNav
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />

      {/* Mobile Menu */}
      <MobileMenuNav
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </nav>
  );
};
