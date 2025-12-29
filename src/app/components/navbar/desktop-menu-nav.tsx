"use client";

import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-transition-progress/next";
import { cn } from "@/lib/utils";
import { NavLinkListItemType } from "@/types/types";
import { ClassValue } from "clsx";
import { ToggleTheme } from "../theme-toggle";



const desktopNavLinkList: NavLinkListItemType[] = [
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

const NavListItem = ({ item }: { item: NavLinkListItemType}) => {
  return (
    <li className={`group relative px-4`}>
      <Link href={item.href}>{item.name}</Link>
    </li>
  );
};

export const DeskTopNavList = ({
  className,

}: {
 
  className?: ClassValue;
 
}) => {
  const defaultClasses = `flex flex-row gap-2`;

  return (
    <ul className={cn(defaultClasses, className)}>
      {desktopNavLinkList.map((item, idx) => {
        return <NavListItem item={item} key={`${idx}_${item.href}`} />;
      })}
    </ul>
  );
};

type DesktopMenuNavProps={
  isAuthenticated:boolean;
  handleLogout:()=>Promise<Boolean>
}




export const DesktopMenuNav = ({isAuthenticated,handleLogout}:DesktopMenuNavProps) => {
    
  
  return (
    <div className="hidden lg:flex  items-center justify-between px-16 lg:px-24 xl:px-44 py-3  border-b border-border relative">
      <div className="flex items-center gap-8 ">
        <DeskTopNavList />

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

      <div className="flex items-center gap-8 ">
        {/* shopping bag */}

        <Button className="relative p-0" variant="ghost">
          <ShoppingBagIcon />

          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            3
          </span>
        </Button>

        {/* login/logout button */}

        {isAuthenticated ? (
          <Button onClick={handleLogout} size="lg">
            Logout
          </Button>
        ) : (
          <Link
            href="/auth"
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login&nbsp;/&nbsp;Signup
          </Link>
        )}
        <ToggleTheme/>
      </div>
    
    </div>
  );
};