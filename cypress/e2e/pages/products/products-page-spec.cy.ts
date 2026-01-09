import { ProductPageActions } from "./products-page-actions";
import { productsPageSelectors } from "./utils";

const { productsMegaMenu, productsMegaMenuToggle, productsMegaMenuItemsList } =
  productsPageSelectors;
const productsPageActions = new ProductPageActions(
  productsMegaMenu,
  productsMegaMenuToggle
);

describe("Products page tests.", () => {
  beforeEach(() => {
    productsPageActions.visit();
  });

  it("Should be able navigate to respective pages through bread crumb links", () => {
    productsMegaMenuItemsList.map((item) => {
      productsPageActions
        .navigateToPageByMegaMenuItem({
          megaMenuItemSelector: item.megaMenuItemSelector,
          pageHeadingSelector: item.pageHeadingSelector,
        })
        .navigateTo({
          itemSelector: item.megaMenuItemBreadcrumbSelector,
          pageHeadingSelector: item.pageHeadingSelector,
        });
    });
  });

  // need to implement ==>
  // it("Should be able to inc. item count and that should be in sync with cart items count.", () => {
  //   productsPageActions.checkIncItemCount()
  // })
});
