import { productsCategoriesLinkList } from "@/app/components/navbar/constants";
import { getFlatLinks } from "../mega-menu/utils";



export const navbarSelectors = {
  productsMegaMenuItemsList:getFlatLinks(productsCategoriesLinkList),
  productsMegaMenuToggle: "mega-menu-toggle-products",
  productsMegaMenu: "products-mega-menu",
  loginSignupLink:"login-signup-link",
  loginHeader:"login-header",
  cartPageHeading:"cart-page-heading",
  cartPageLink:"cart-page-link",
  toggleThemeBtn:"toggle-theme-btn"
};
