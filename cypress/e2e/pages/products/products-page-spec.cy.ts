import { ProductPageActions } from "./actions/products-page-actions";
import { productPageSelectors } from "./utils";
const {productPageHeader} = productPageSelectors

const productsPageActions = new ProductPageActions()

describe("Products page tests.", () => {
  beforeEach(() => {
    productsPageActions.visit();
  });

  it("Should be able to view products page header",()=>{
    cy.getBySel(productPageHeader)
  })
})