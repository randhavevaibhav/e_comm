"use client";

import { capitalize, cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "react-transition-progress/next";

type BreadcrumbListItem = {
  name: string;
  href: string;
};

const BreadcrumbListItem = ({
  item,
  isLastItem,
}: {
  item: BreadcrumbListItem;
  isLastItem: boolean;
}) => {
  return (
    <li className="flex items-center ">
      <Link
        href={item.href}
        className="p-1 rounded-md font-medium tracking-wide hover:text-indigo-500 text-muted-foreground lg:text-base text-sm "
      >
        {capitalize(item.name)}
      </Link>
      {!isLastItem ? (
        <ChevronRightIcon size={16} className="mt-0.5 text-muted-foreground" />
      ) : null}
    </li>
  );
};

type BreadcrumbProps = {
  className?: ClassValue;
};

export const Breadcrumb = ({ className }: BreadcrumbProps) => {
  const defaultClasses = `flex`;
  const pathname = usePathname();
  const navList = pathname
    .split("/")
    .filter((val) => val != "");

  const breadCrumbList = navList.reduce(
    (acc, val, idx) => {
      let nodeName = val;

      if (nodeName.includes("_")) {
        nodeName = nodeName.split("_")[1].replaceAll("-", " ");
      } else if (val.includes("-")) {
        nodeName = nodeName.replaceAll("-", " ");
      }

      const newNode = {
        name: nodeName,
        href: `/${navList.slice(0, idx + 1).join("/")}`,
      };
      acc = [...acc, newNode];
      return acc;
    },
    [] as {
      name: string;
      href: string;
    }[]
  );

  return (
    <ul className={cn(defaultClasses, className)}>
      {breadCrumbList.map((item, idx) => {
        const isLastItem = idx + 1 === breadCrumbList.length ? true : false;
        return (
          <BreadcrumbListItem
            item={item}
            key={`${idx}_${item.href}`}
            isLastItem={isLastItem}
          />
        );
      })}
    </ul>
  );
};
