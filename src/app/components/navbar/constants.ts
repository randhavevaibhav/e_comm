import { MegaMenuCategoryType } from "../ui/mega-menu";




export const productsCategories:MegaMenuCategoryType[] = [
  {
    title: "All",
    href: "/products",
    dataTest:"products-page-link"
  },
  {
    title: "Men",
    href: "/products/men",
    items: [
      {
        name: "Shirts",
        href: "/products/men/men-shirts",
      },
      {
        name: "Pants",
        href: "/products/men/men-pants",
      },
    ],
  },
  {
    title: "Women",
    href: "/products/women",
    items: [
      {
        name:  "Shirts",
        href: "/products/women/women-shirts",
      },
      {
        name:  "Pants",
        href: "/products/women/women-pants",
      },
    ],
  },
   {
    title: "Kids",
    href: "/products/kids",
    items: [
      {
        name:  "Shirts",
        href: "/products/kids/kids-shirts",
      },
      {
        name:  "Pants",
        href: "/products/kids/kids-pants",
      },
    ],
  },
];