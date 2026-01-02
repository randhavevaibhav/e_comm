"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/app/components/logo";
import { ToggleTheme } from "@/app/components/theme-toggle";
import { Button } from "@/app/components/ui/button";
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import { Link } from "react-transition-progress/next";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MegaMenuItem } from "@/app/components/ui/mega-menu";
import { productsCategories } from "./constants";
import { LoginLogoutBtn } from "./login-logout-btn";
import { useMobile } from "@/hooks/useMobile";



export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
const isMobile = useMobile()
  const closeMobileSidebar = () => setIsOpen(false);
  const toggleMobileSidebar = () => setIsOpen((prev) => !prev);

  const isPathExcluded = ["/auth"].includes(pathname);

  if (isPathExcluded) {
    return null;
  }
  return (
    <>
      <nav>
        <header className="flex bg-card border-b border sm:px-6 px-4 min-h-16 tracking-wide relative z-(--nav-header-z-index)">
          <div className="flex max-w-7xl mx-auto w-full">
            <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
              {/* Mobile Toggle Button */}
              <Button
                onClick={toggleMobileSidebar}
                className="lg:hidden px-2"
                variant="ghost"
              >
                <MenuIcon />
              </Button>
              {/* Logo Section */}
              <Logo />

              <div
                className={cn(
                  `lg:ml-6 h-full place-content-center lg:block! 
                    max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-60 max-lg:before:inset-0 max-lg:before:z-(--nav-header-z-index)`,
                  {
                    block: isOpen,
                    hidden: !isOpen,
                  }
                )}
              >
                {/* Mobile Close Side menu Button */}
                <Button
                  variant="ghost"
                  onClick={closeMobileSidebar}
                  className="p-0 lg:hidden fixed top-2 right-4 z-100 rounded-full bg-card border-input/40 w-9 h-9 flex items-center justify-center  cursor-pointer"
                >
                  <XIcon />
                </Button>
                {/* Navigation Menu */}
                <ul className="h-full lg:place-items-center flex lg:flex-row flex-col lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-card max-lg:border max-lg:border-input/50  max-lg:w-1/2 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:shadow-md max-lg:overflow-auto z-(--nav-header-z-index)">
                  {/* logo */}
                  <li className="mb-6 hidden max-lg:block">
                    <Logo />
                  </li>
                  <li className="lg:hover:border-b lg:hover:border-indigo-500 lg:hover:text-indigo-500 transition-all  font-semibold ">
                    <Link href="/" className="p-1">Home</Link>
                  </li>

                  {/* Mega Menu Parent Item */}
                  <li className=" place-content-center lg:py-0 py-3 max-lg:relative group ">
                    <MegaMenuItem
                      itemTitle="Products"
                      categories={productsCategories}
                      onClickCategoriesCb={closeMobileSidebar}
                      itemTitleDataTest="products-nav-menu-item"
                    />
                    
                  </li>
                

                  <li className="font-medium lg:hover:border-b lg:hover:border-indigo-500 lg:hover:text-indigo-500 transition-all">Contact</li>

                  <li>
                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                      {/* product search */}
                      <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                      />
                      <SearchIcon />
                    </div>
                  </li>

                  <li className=" mt-auto">
                    <LoginLogoutBtn className={`lg:hidden block`} />
                  </li>
                </ul>
              </div>
            </div>
            {/* Right-end side */}
            <div className="flex items-center lg:gap-8 gap-4">
              {/* shopping bag */}

              <Button className="relative p-0" variant="ghost">
                <ShoppingBagIcon size={isMobile?20:25}/>

                <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                  3
                </span>
              </Button>

              {/* login/logout button */}

              <LoginLogoutBtn className="lg:block hidden" />
              <ToggleTheme />
            </div>
          </div>
        </header>
      </nav>
    </>
  );
};
