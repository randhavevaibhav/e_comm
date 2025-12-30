"use client";

import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { NavLinkListItemType } from "@/types/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  ComponentPropsWithRef,
  forwardRef,
  useRef,
  useState,
} from "react";
import { Link } from "react-transition-progress/next";

const productList: NavLinkListItemType[] = [
  {
    name: "All Products",
    href: "/products",
    children: [
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
            href: "/products/kids/kids-shirts",
          },
          {
            name: "Kid pants",
            href: "/products/kids/kids-pants",
          },
        ],
      },
    ],
  },
];



type ExpandableListItemProps = ComponentPropsWithRef<"li"> & {
  listItem: NavLinkListItemType;
  isLastElement: boolean;
};

const ExpandableListItem = (props: ExpandableListItemProps) => {
  const { listItem, isLastElement } = props;
  const [expand, setExpand] = useState(false);
  const elementRef = useRef<HTMLLIElement>(null);
  const isMobile = useMobile();

  const handleClick = () => {
    setExpand((prev) => !prev);

   if(!expand&&isLastElement&&isMobile)
   {
     setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 400);
   }
  };

  return (
    <li>
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg px-4 pb-1 pt-3"
        onClick={handleClick}
      >
        <div className="flex gap-2 items-center">
          {listItem?.icon ? listItem.icon : null}
          <span className="text-sm font-medium"> {listItem.name} </span>
        </div>
        {expand?<ChevronUpIcon size={16}/>:<ChevronDownIcon size={16}/>}
       
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
              const isLastElement = idx + 1 === listItem.children?.length;
              return (
                <ListItem
                  listItem={listItem}
                  key={idx}
                  isLastElement={isLastElement}
                  ref={elementRef}
                />
              );
            })}
          </ul>
        ) : null}
      </div>
    </li>
  );
};

type RegularListItemProps = ComponentPropsWithRef<"li"> & {
  listItem: NavLinkListItemType;
 
};

const RegularListItem = forwardRef<HTMLLIElement, RegularListItemProps>(
  (props, ref) => {
    const { listItem } = props;

    return (
      <li ref={ref}>
        <Link
          href={listItem.href}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium w-full"
        >
          {listItem.icon ? listItem.icon : null}
          {listItem.name}
        </Link>
      </li>
    );
  }
);

type ListItemProps = ComponentPropsWithRef<"li"> & {
  listItem: NavLinkListItemType;
  isLastElement: boolean;
};

const ListItem = forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { listItem, isLastElement } = props;

  if (listItem.children && listItem.children?.length > 0) {
    return (
      <ExpandableListItem
        listItem={listItem}
        isLastElement={isLastElement}
        ref={ref}
      />
    );
  }

  return (
    <RegularListItem
      listItem={listItem}
      ref={ref}
    />
  );
});

const List = ({ itemList }: { itemList: NavLinkListItemType[] }) => {
  return (
    <ul className="mt-6 space-y-1 lg:max-h-max max-h-80 overflow-y-auto dark:bg-input/30 border border-input rounded-md">
      {itemList.map((listItem, idx) => {
        const isLastElement = idx + 1 === itemList.length;
        return (
          <ListItem
            listItem={listItem}
            key={idx}
            isLastElement={isLastElement}
          />
        );
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
