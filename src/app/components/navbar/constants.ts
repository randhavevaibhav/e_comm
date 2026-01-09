import { MegaMenuCategoryType } from "../ui/mega-menu/types";

  export const PUBLIC_ROUTES = [
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  export const PROTECTED_ROUTES = [
    {
      name: "My orders",
      href: "/my-orders",
    },
  ];


export const productsCategoriesLinkList:MegaMenuCategoryType[] = [
  {
    title: "All",
    href: "/products",

  
  },
  {
    title: "Men",
    href: "/products/men",
    items: [
      {
        title: "Shirts",
        href: "/products/men/men-shirts",
      },
      {
        title: "Pants",
        href: "/products/men/men-pants",
      },
    ],
  },
  {
    title: "Women",
    href: "/products/women",
    items: [
      {
        title:  "Shirts",
        href: "/products/women/women-shirts",
      },
      {
        title:  "Pants",
        href: "/products/women/women-pants",
      },
    ],
  },
   {
    title: "Kids",
    href: "/products/kids",
    items: [
      {
        title:  "Shirts",
        href: "/products/kids/kids-shirts",
      },
      {
        title:  "Pants",
        href: "/products/kids/kids-pants",
      },
    ],
  },
];