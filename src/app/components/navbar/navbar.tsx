"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/app/components/logo";
import { ToggleTheme } from "@/app/components/theme-toggle";
import { Button } from "@/app/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { MegaMenuItem } from "@/app/components/ui/mega-menu";
import { productsCategories } from "./constants";
import { LoginLogoutBtn } from "./login-logout-btn";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { ProductSearch } from "./product-search";
import { ShoppingCart } from "./shopping-cart";
import { ClientOnly } from "../client-only";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileSidebar = () => setIsOpen(false);
  const toggleMobileSidebar = () => setIsOpen((prev) => !prev);

  const isPathExcluded = ["/auth"].includes(pathname);

  if (isPathExcluded) {
    return null;
  }

  return (
    <>
      <nav>
        <header className="flex bg-card border-b border sm:px-6 lg:px-4 px-2 min-h-16 tracking-wide fixed top-0 w-full z-(--nav-header-z-index)">
          <div className="flex max-w-7xl mx-auto w-full">
            <div className="flex  items-center lg:gap-y-2 gap-4 w-full">
              {/* Mobile Toggle Button */}
              <Button
                onClick={toggleMobileSidebar}
                className="lg:hidden px-2"
                variant="ghost"
              >
                <MenuIcon />
              </Button>

              <div className="lg:hidden block max-sm:w-full max-xl:w-1/2 ">
                <ProductSearch />
              </div>

              <div
                className={cn(
                  `lg:ml-4 h-full place-content-center lg:block! 
                    max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-60 max-lg:before:inset-0 max-lg:before:z-(--nav-header-z-index) w-full`,
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
                <ul className="h-full w-full lg:place-items-center flex lg:flex-row flex-col lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-card max-lg:border max-lg:border-input/50  max-lg:w-1/2 max-lg:min-w-[280px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:shadow-md max-lg:overflow-auto z-(--nav-header-z-index)">
                  {/* logo inside mobile side menu*/}
                  <li className="mb-6 hidden max-lg:block">
                    <Logo />
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

                  <PublicRoutes />
                  <ProtectedRoutes />

                  <li className="lg:block hidden w-1/2">
                    <ProductSearch />
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

              <ClientOnly>
                <ShoppingCart />
              </ClientOnly>

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
