import {  productsPageActions } from "./products-page-actions";
import { productsPageSelectors } from "./utils";

const { productsMegaMenuItemsList } =
  productsPageSelectors;


describe("Products page tests.", () => {
  beforeEach(() => {
    productsPageActions.visit();
  });

  it("Should be able navigate to respective pages through bread crumb links", () => {
    productsMegaMenuItemsList.map((item) => {
      productsPageActions.navigateToPageByMegaMenuItem({
        megaMenuItemSelector: item.megaMenuItemSelector,
        pageHeadingSelector: item.pageHeadingSelector,
      });

      cy.get(".breadcrumb-link").filter(":visible").then(($breadCrumbs) => {
        const reversedBreadCrumbs = Cypress.$.makeArray($breadCrumbs).reverse();
        cy.wrap(reversedBreadCrumbs).each(($el) => {
          const itemSelector = $el.attr("data-test") as string;
          const pageHeadingSelector = $el.attr("data-test-page-heading") as string;
          productsPageActions.navigateTo({
            itemSelector,
            pageHeadingSelector,
          });
        });
      });
    });
  });

  
  it("Should be able to inc./dec. item count and that should be in sync with cart items count.", () => {
    productsPageActions.checkIncDecItemCount();
  });

   it("Should be able to redirect user to product page when clicked on individual product", () => {
    productsPageActions.clickOnFirstProduct().checkNavToProductPage();
  });
});
