"use client";

import {  ChevronRightIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "react-transition-progress/next";

type BreadcrumbListItem = {
  name: string;
  href: string;
};

type BreadcrumbListProps = {
  list: BreadcrumbListItem[];
};

const BreadcrumbListItem = ({ item ,isLastItem}: { item: BreadcrumbListItem,isLastItem:boolean }) => {
  return (
    <li className="flex items-center ">
      <Link href={item.href} className="p-1 rounded-md font-medium tracking-wide hover:text-indigo-500 text-gray-600">{item.name}</Link>
      {!isLastItem?<ChevronRightIcon size={16} className="mt-0.5"/>:null}
    </li>
  );
};

const BreadcrumbList = ({ list }: BreadcrumbListProps) => {
  return (
    <ul className="flex ">
    
      {list.map((item, idx) => {
        const isLastItem = idx+1===list.length?true:false;
        return <BreadcrumbListItem item={item} key={`${idx}_${item.href}`} isLastItem={isLastItem}/>;
      })}
    </ul>
  );
};

export const Breadcrumb = () => {
  const pathname = usePathname();
  const navList = pathname.split("/").filter((val) => val != "")
  const breadCrumbList = navList.reduce(
      (acc, val,idx) => {

        const newNode = {
          name: val,
          href: `/${navList.slice(0,idx+1).join("/")}`,
        };
        acc = [...acc,newNode];
        return acc;
      },
      [] as {
        name: string;
        href: string;
      }[]
    );

  
  return <div>
    <BreadcrumbList list={breadCrumbList}/>
  </div>;
};
