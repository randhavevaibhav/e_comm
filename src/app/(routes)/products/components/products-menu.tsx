"use client";

import { cn } from "@/lib/utils";
import { NavLinkListItemType } from "@/types/types";
import { useState } from "react";
import { Link } from "react-transition-progress/next";

const productList: NavLinkListItemType[] = [
  {
    name: "Men",
    href: "/products/men",
    children: [
      {
        name: "All",
        href: "/products/men",
      },
      {
        name: "Men shirts",
        href: "/products/men/men-shirts",
      },
      {
        name: "Men pants",
        href: "/products/men/men-pants",
      },
    ],
  },
  {
    name: "Women",
    href: "/products/women",
    children: [
      {
        name: "All",
        href: "/products/women",
      },
      {
        name: "Women shirts",
        href: "/products/women/women-shirts",
      },
      {
        name: "Women pants",
        href: "/products/women/women-pants",
      },
    ],
  },
  {
    name: "Kids",
    href: "/products/kids",
    children: [
      {
        name: "All",
        href: "/products/kids",
      },
      {
        name: "Kid shirts",
        href: "/products/kids/kid-shirts",
      },
      {
        name: "Kid pants",
        href: "/products/kids/kid-pants",
      },
    ],
  },
];

const ExpandIcon = ({ expand = false }) => {
  return (
    <span
      className={`shrink-0 transition duration-300 ${
        expand ? `-rotate-180` : ``
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
};

const ExpandableListItem = ({
  listItem,
}: {
  listItem: NavLinkListItemType;
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <li>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => setExpand((prev) => !prev)}
      >
        <div className="flex gap-2 items-center">
          {listItem?.icon ? listItem.icon : null}
          <span className="text-sm font-medium"> {listItem.name} </span>
        </div>

        <ExpandIcon expand={expand} />
      </div>
      {/* Sub-list */}
      <div
        className={cn(`grid duration-500`, {
          "grid-rows-[1fr] opacity-100": expand,
          "grid-rows-[0fr]  opacity-0": !expand,
        })}
      >
        {listItem.children ? (
          <ul className="mt-2 space-y-1 px-4 overflow-hidden">
            {listItem.children.map((listItem, idx) => {
              return <ListItem listItem={listItem} key={idx} />;
            })}
          </ul>
        ) : null}
      </div>
    </li>
  );
};

const RegularListItem = ({ listItem }: { listItem: NavLinkListItemType }) => {
  return (
    <li>
      <Link
        href={listItem.href}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full"
      >
        {listItem.icon ? listItem.icon : null}
        {listItem.name}
      </Link>
    </li>
  );
};

const ListItem = ({ listItem }: { listItem: NavLinkListItemType }) => {
  if (listItem.children && listItem.children?.length > 0) {
    return <ExpandableListItem listItem={listItem} />;
  }

  return <RegularListItem listItem={listItem} />;
};

const List = ({ itemList }: { itemList: NavLinkListItemType[] }) => {
  return (
    <ul className="mt-6 space-y-1 ">
      {itemList.map((listItem, idx) => {
        return <ListItem listItem={listItem} key={idx} />;
      })}
    </ul>
  );
};

export const ProductsMenu = () => {
  return (
    <div className="">
      <h4 className="font-semibold text-xl m-2">Products Menu</h4>

      <List itemList={productList} />
    </div>
  );
};
