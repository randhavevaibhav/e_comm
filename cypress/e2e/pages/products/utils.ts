import { productsCategoriesLinkList } from "@/app/components/navbar/constants";
import { getFlatLinks } from "@Cypress/e2e/components/mega-menu/utils";

export const productsPageSelectors = {
  productsMegaMenuItemsList:getFlatLinks(productsCategoriesLinkList),
  productsMegaMenuToggle: "mega-menu-toggle-products",
  productsMegaMenu: "products-mega-menu",
  incItemCountBtn:"inc-item-count-btn",
  decItemCountBtn:"dec-item-count-btn",
  totalCartItems:"total-cart-items",
  itemQuantity:"item-quantity",
  addItemBtn:"add-item-btn",
  productCard:"product-card"
};
