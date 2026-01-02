"use client";

import {
  ComponentPropsWithRef,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Link } from "react-transition-progress/next";

import { cn } from "@/lib/utils";
import { createContext } from "react";
import { Button } from "@/app/components/ui/button";
import { useProgress } from "react-transition-progress";
import { useMobile } from "@/hooks/useMobile";

export type MegaMenuCategoryType = {
  title: string;
  href: string;
  dataTest?: string;
  items?: {
    name: string;
    href: string;
    dataTest?: string;
  }[];
};

type MegaMenuToggleProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
  callback?: () => void;
  itemTitleDataTest?:string;
};

const MegaMenuToggle = forwardRef<HTMLButtonElement, MegaMenuToggleProps>(
  (props, ref) => {
    const { children, callback ,itemTitleDataTest} = props;
    const { toggleMegaMenu, isMegaMenuOpen ,openMegaMenu} = useMegaMenuContext();
    const isMobile = useMobile();
    return (
      <Button
        className=" text-[15px] flex items-center outline-none lg:px-2 px-0 lg:hover:border-b lg:hover:border-indigo-500 lg:hover:text-indigo-500  transition-all font-medium rounded-none"
        onClick={(e) => {
          if(isMobile)
          {
            toggleMegaMenu();
          }
          callback && callback();
        }}
        onMouseEnter={()=>{
          if(!isMobile){
            openMegaMenu()
          }
        }}
        aria-expanded={isMegaMenuOpen}
        aria-haspopup="true"
        type="button"
        variant="ghost"
        ref={ref}
        data-test={itemTitleDataTest}
      >
        {children}
      </Button>
    );
  }
);

type MegaMenuContainerProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
};

const MegaMenuContainer = forwardRef<HTMLButtonElement, MegaMenuContainerProps>(
  (props, ref) => {
    const { children } = props;
    const { isMegaMenuOpen, closeMegaMenu } = useMegaMenuContext();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isMegaMenuOpen) return;

      const handleKeydown = (e: KeyboardEvent) =>
        e.key === "Escape" && closeMegaMenu();
      const handleClickOutside = (e: MouseEvent) => {
        const isClickOutSide =
          containerRef.current &&
          !containerRef.current.contains(e.target as Node);

        //required type check for forwarded ref
        if (ref && typeof ref !== "function" && ref.current) {
          if (ref.current.contains(e.target as Node)) {
            return;
          }
        }

        if (isClickOutSide) {
          closeMegaMenu();
        }
      };

      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMegaMenuOpen, closeMegaMenu]);
    return (
      <div
        className={cn(
          `w-full absolute shadow-lg bg-card border-input/40 border lg:px-6 px-4 py-4 lg:py-8 top-16 right-0 left-0 z-(--nav-header-z-index) transition-all duration-300 max-lg:overflow-y-scroll max-lg:max-h-(--mobile-mega-menu-height)`,
          {
            block: isMegaMenuOpen,
            hidden: !isMegaMenuOpen,
          }
        )}
        ref={containerRef}
        onMouseLeave={closeMegaMenu}
      >
        <div className="max-w-6xl mx-auto flex max-lg:flex-col gap-x-12 gap-y-6">
          {children}
        </div>
      </div>
    );
  }
);

const MegaMenuSideImg = () => {
  return (
    <div className="max-w-sm max-[1200px]:max-w-xs w-full aspect-6/3">
      <img
        src="https://readymadeui.com/images/digital-img-5.webp"
        alt="product-img"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

type CategoryBlockProps = MegaMenuCategoryType & {
  callback: () => void;
};

const CategoryBlock = ({
  dataTest = "",
  title,
  href,
  items,
  callback,
}: CategoryBlockProps) => {
  const { closeMegaMenu } = useMegaMenuContext();
  const startProgress = useProgress();
  const [isPending, startTransition] = useTransition();

  const handleLinkClick = () => {
    startTransition(() => {
      startProgress();
      closeMegaMenu();
      callback && callback();
    });
  };

  return (
    <div className="">
      <Link
        className="lg:hover:text-indigo-500 lg:hover:border-indigo-500 text-base font-semibold mb-4 lg:hover:border-b lg:border-foreground pb-1 transition-all"
        href={href}
        onClick={handleLinkClick}
        data-test={dataTest}
      >
        {title}
      </Link>
      <ul className="space-y-3 mt-2">
        {items &&
          items.map((item, idx) => (
            <li key={`${item.href}_${item.name}_${idx}`}>
              <Link
                href={item.href}
                className="text-sm  text-muted-foreground text-wrap"
                onClick={handleLinkClick}
                data-test={item.dataTest ? item.dataTest : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
      <hr className="mt-2 lg:hidden block" />
    </div>
  );
};

const MegaMenuCategoryContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="grid lg:grid-cols-4 gap-6 w-full">{children}</div>;
};

type MegaMenuContextType = {
  toggleMegaMenu: () => void;
  isMegaMenuOpen: boolean;
  closeMegaMenu: () => void;
  openMegaMenu: () => void;
};

const MegaMenuContext = createContext<MegaMenuContextType | null>(null);

type MegaMenuProviderType = {
  children: React.ReactNode;
};

const MegaMenuProvider = ({ children }: MegaMenuProviderType) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const toggleMegaMenu = () => setIsMegaMenuOpen((prev) => !prev);
  const closeMegaMenu = () => setIsMegaMenuOpen(false);
  const openMegaMenu = () => setIsMegaMenuOpen(true);

  return (
    <MegaMenuContext.Provider
      value={{ isMegaMenuOpen, toggleMegaMenu, closeMegaMenu, openMegaMenu }}
    >
      {children}
    </MegaMenuContext.Provider>
  );
};

const useMegaMenuContext = () => {
  const contextValue = useContext(MegaMenuContext);

  if (!contextValue) {
    throw new Error(
      `Please use MegaMenuContext inside MegaMenuContext Provider.`
    );
  }
  return contextValue;
};

export const MegaMenu = ({ children }: { children: React.ReactNode }) => {
  return <MegaMenuProvider>{children}</MegaMenuProvider>;
};

type MegaMenuItemProps = {
  itemTitle: string;
  onClickCategoriesCb?: () => void;
  categories: MegaMenuCategoryType[];
  itemTitleDataTest?:string;
};

export const MegaMenuItem = ({
  itemTitle,
  categories,
  onClickCategoriesCb,
  itemTitleDataTest="",
}: MegaMenuItemProps) => {
  const itemTitleRef = useRef<HTMLButtonElement>(null);

  return (
    <MegaMenu>
      <MegaMenu.Toggle ref={itemTitleRef} itemTitleDataTest={itemTitleDataTest}>{itemTitle}</MegaMenu.Toggle>
      <MegaMenu.Container ref={itemTitleRef}>
        <MegaMenu.CategoryContainer>
          {categories.map((category, idx) => {
            return (
              <MegaMenu.CategoryBlock
                title={category.title}
                href={category.href}
                items={category.items}
                callback={onClickCategoriesCb ? onClickCategoriesCb : () => {}}
                dataTest={category.dataTest}
                key={`${category.title}_${category.href}_${idx}`}
              />
            );
          })}
        </MegaMenu.CategoryContainer>
        <MegaMenu.SideImg />
      </MegaMenu.Container>
    </MegaMenu>
  );
};

MegaMenu.Toggle = MegaMenuToggle;
MegaMenu.Container = MegaMenuContainer;
MegaMenu.CategoryContainer = MegaMenuCategoryContainer;
MegaMenu.CategoryBlock = CategoryBlock;
MegaMenu.SideImg = MegaMenuSideImg;
