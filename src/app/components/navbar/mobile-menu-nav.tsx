"use client";

import { cn } from "@/lib/utils";
import {
  ContactIcon,
  HomeIcon,
  MenuIcon,
  PackageIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";
import { Link } from "react-transition-progress/next";

import { ClassValue } from "clsx";
import { ToggleTheme } from "../theme-toggle";
import { useMobile } from "@/hooks/useMobile";

type mobileNavLinkListType = {
  name: string;
  href: string;
  logo: React.ReactNode;
};

const mobileNavLinkList: mobileNavLinkListType[] = [
  {
    name: "Home",
    href: "/",
    logo: <HomeIcon />,
  },
  {
    name: "Products",
    href: "/products",
    logo: <PackageIcon />,
  },
  {
    name: "Contact",
    href: "/contact",
    logo: <ContactIcon />,
  },
];

const NavListItem = ({
  item,
  hideNav = () => {},
}: {
  item: mobileNavLinkListType;
  hideNav?: () => void;
}) => {
  return (
    <li
      className={`flex items-center gap-2 px-4 h-9 bg-input/30 rounded-md border font-medium  `}
      onClick={hideNav}
    >
      {item.logo}
      <Link href={item.href} className="w-full">
        {item.name}
      </Link>
    </li>
  );
};

export const MobileNavList = ({
  className,
  hideNav,
}: {
  className?: ClassValue;
  hideNav: () => void;
}) => {
  const defaultClasses = `flex flex-col gap-4 w-full`;

  return (
    <ul className={cn(defaultClasses, className)}>
      {mobileNavLinkList.map((item, idx) => {
        return (
          <NavListItem
            item={item}
            key={`${idx}_${item.href}`}
            hideNav={hideNav}
          />
        );
      })}
    </ul>
  );
};

type MobileMenuNavProps = {
  isAuthenticated: boolean;
  handleLogout: () => Promise<boolean>;
};

export const MobileMenuNav = ({
  isAuthenticated,
  handleLogout,
}: MobileMenuNavProps) => {

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();

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

  const hideNav = () => {
    setOpen(false);
    if (isMobile) {
      document.body.style.overflowY = "auto";
    }
  };

  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return (
    <div className="lg:hidden flex justify-between items-center  border-b border-border px-2 py-1 h-(--mobile-header-height)">
      <button
        onClick={toggleOpen}
        aria-label="Menu"
        type="button"
        className="lg:hidden p-1 cursor-pointer"
      >
        {/* Menu Icon SVG */}
        {!open ? <MenuIcon /> : <XIcon />}
      </button>
      <ToggleTheme className={`lg:hidden`} />
      {mounted
        ? createPortal(
            <div
              className={cn(
                "absolute inset-0 top-(--mobile-header-height) bg-background/70 lg:hidden transition-all duration-300 ease-in-out",
                {
                  "opacity-100 visible translate-y-0": open,
                  "opacity-0 invisible -translate-y-full": !open,
                }
              )}
            >
              <div
                className={cn(
                  `absolute  left-0 w-full bg-background shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm  h-(--mobile-sidebar-height) justify-between`
                )}
              >
                <MobileNavList hideNav={hideNav} />
                {isAuthenticated ? (
                  <Button onClick={handleLogout} className={`w-[80%] mx-auto h-9 text-center leading-9 text-lg`}>
                    Logout
                  </Button>
                ) : (
                  <Link
                    href="/auth"
                    className=" w-[80%] mx-auto h-9 text-center leading-9 text-lg  cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full my-2"
                  >
                    Login&nbsp;/&nbsp;Signup
                  </Link>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};
