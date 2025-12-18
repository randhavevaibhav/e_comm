"use client";

import { MenuIcon, SearchIcon, ShoppingBagIcon, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useAuth } from "../(routes)/auth/_auth-contexts/auth-context";
import { Link } from "react-transition-progress/next";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { ClassValue } from "clsx";
import { NavLinkListItemType } from "@/types/types";
import { useMobile } from "@/hooks/useMobile";

type MobileNavProps = {
  open: boolean;
  toggleOpen: () => void;
  isAuthenticated: boolean;
  handleLogout: () => Promise<boolean>;
};

type DesktopMenuNav = {
  isAuthenticated: boolean;
  handleLogout: () => Promise<boolean>;
};

const navLinkList: NavLinkListItemType[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const NavListItem = ({ item }: { item: NavLinkListItemType }) => {
  return (
    <li className={`group relative px-4`}>
      <Link href={item.href}>{item.name}</Link>
    </li>
  );
};

const NavList = ({
  list,
  className,
}: {
  list: NavLinkListItemType[];
  className?: ClassValue;
}) => {
  const defaultClasses = `flex lg:flex-row flex-col gap-2`;

  return (
    <ul className={cn(defaultClasses, className)}>
      {list.map((item, idx) => {
        return <NavListItem item={item} key={`${idx}_${item.href}`} />;
      })}
    </ul>
  );
};

const MobileNav = ({
  open,
  toggleOpen,
  isAuthenticated,
  handleLogout,
}: MobileNavProps) => {
  return (
    <>
      <button
        onClick={toggleOpen}
        aria-label="Menu"
        type="button"
        className="lg:hidden p-1 cursor-pointer"
      >
        {/* Menu Icon SVG */}
        {!open ? <MenuIcon /> : <X />}
      </button>
      <div
        className={cn(
          `absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm lg:hidden transition-all duration-300 ease-in-out h-[540px]`,
          {
            "opacity-100 visible translate-y-0": open,
            "opacity-0 invisible -translate-y-full": !open,
          }
        )}
      >
        <NavList list={navLinkList} />
        {isAuthenticated ? (
          <Button onClick={handleLogout} className={`my-2`}>
            Logout
          </Button>
        ) : (
          <Link
            href="/auth"
            className="inline-block cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full my-2"
          >
            Login&nbsp;/&nbsp;Signup
          </Link>
        )}
      </div>
    </>
  );
};

const DesktopMenuNav = ({ isAuthenticated, handleLogout }: DesktopMenuNav) => {
  return (
    <>
      <div className="hidden lg:flex items-center gap-8 ">
        <NavList list={navLinkList} />

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          {/* product search */}
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <SearchIcon />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8 ">
        {/* shopping bag */}

        <Button className="relative text-black p-0" variant="ghost">
          <ShoppingBagIcon />

          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            3
          </span>
        </Button>

        {/* login/logout button */}

        {isAuthenticated ? (
          <Button onClick={handleLogout} size="lg">Logout</Button>
        ) : (
          <Link
            href="/auth"
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login&nbsp;/&nbsp;Signup
          </Link>
        )}
      </div>
    </>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isMobile = useMobile();

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

  const toggleOpen = () => {
    setOpen((prev) => !prev);
    if (isMobile) {
      if (open) {
        document.body.style.overflowY = "auto";
      } else {
        document.body.style.overflowY = "hidden";
      }
    }
  };

  const isPathExcluded = ["/auth"].includes(pathname);

  if (isPathExcluded) {
    return null;
  }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-44 py-4 border-b border-gray-300 bg-white relative ">
      {/* logo */}

      {/* Desktop Menu */}
      <DesktopMenuNav
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />

      {/* Mobile Menu */}
      <MobileNav
        open={open}
        toggleOpen={toggleOpen}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
    </nav>
  );
};
