import { productPageSelectors } from "../utils";

const {productPageHeader,productPageLink,productsNavMenuItem} = productPageSelectors;
export class ProductPageActions {
  visit() {
    cy.visit("/products");
    cy.get(".test-progress-bar", {
      timeout: 6000,
    }).should("not.exist");
    return this;
  }


}
