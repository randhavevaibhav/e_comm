import { NavbarActions } from "./navbar-actions";
import { navbarSelectors } from "./utils";

const {
  productsMegaMenu,
  productsMegaMenuToggle,
  productsMegaMenuItemsList,
  loginSignupLink,
  loginHeader,
  cartPageHeading,
  cartPageLink
} = navbarSelectors;

const navbarActions = new NavbarActions(productsMegaMenu,productsMegaMenuToggle);

describe("navbar tests.", () => {
  beforeEach(() => {
    navbarActions.visit();
  });

  it("Should be able to see products mega menu and navigate to respective mega menu item pages", () => {
    navbarActions.navigateToPageByMegaMenuItemList(productsMegaMenuItemsList);
  });

  it("Should able to navigate to /cart page when clicked on cart button", () => {
    navbarActions.navigateTo({
      itemSelector: cartPageLink,
      pageHeadingSelector: cartPageHeading,
    });
  });

  it("Should able to navigate to /auth page when clicked on login/signup button", () => {
    navbarActions.navigateTo({
      itemSelector: loginSignupLink,
      pageHeadingSelector: loginHeader,
    });
  });

   it("Should able to toggle theme and persist theme after reload", () => {
    navbarActions.togglePersistTheme();
   
  });
  
});
