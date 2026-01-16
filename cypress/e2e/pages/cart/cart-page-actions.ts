import { cartPageSelectors } from "./utils";
import { productsPageActions } from "../products/products-page-actions";
const {
  removeItemBtn,
  incItemCountBtn,
  decItemCountBtn,
  cartItem,
  totalPrice,
  totalCartItems,
} = cartPageSelectors;

export class CartPageActions {
  visit() {
    productsPageActions.visit();
    productsPageActions.addNItemsToCart(4);
    cy.visit("/cart");
    cy.waitForProgressBar();
    return this;
  }

  incFirstItemCount() {
    cy.getBySel(cartItem)
      .first()
      .then(($item) => {
        cy.wrap($item).find(`[data-test=${incItemCountBtn}]`).click();
      });
    return this;
  }

  decFirstItemCount() {
    cy.getBySel(cartItem)
      .first()
      .then(($item) => {
        cy.wrap($item).find(`[data-test=${decItemCountBtn}]`).click();
      });
    return this;
  }

  computeAndCompCartTotal() {
    cy.getBySel(cartItem).then(($items) => {
      const priceValues = Cypress._.map($items, ($el) => {
        const price = $el.getAttribute("data-test-price");
        const quantity = $el.getAttribute("data-test-quantity");

        return price && quantity ? parseFloat(price) * parseFloat(quantity) : 0;
      });

      const computedTotal = priceValues.reduce((acc, price) => acc + price, 0);

      cy.getBySel(totalPrice)
        .invoke("attr", "data-value")
        .then((displayedTotalAttr) => {
          const displayedTotal = displayedTotalAttr
            ? parseFloat(displayedTotalAttr)
            : 0;

          // 5. Assert equality
          // Use a small tolerance for floating point math if necessary
          expect(computedTotal).to.be.closeTo(displayedTotal, 0.01);
        });
    });
     return this;
  }

  removeAllItems() {
    cy.getBySel(cartItem).then(($items) => {
      const itemCount = $items.length;
      //standard loop to avoid stale element references from .each()
      for (let i = 0; i < itemCount; i++) {
        // Re-query the first item every time to ensure it is attached to the DOM
        cy.getBySel(cartItem)
          .first()
          .within(() => {
            cy.get(`[data-test=${removeItemBtn}]`).click();
          });
        // Wait for the item to actually disappear before the next loop to prevents the next iteration from trying to click a disappearing element
        cy.getBySel(cartItem).should("have.length", itemCount - i - 1);
      }
    });
    return this;
  }
  compareCartTotal(value: number, compare: "eq" | "be.gt" | "be.lt") {
    cy.getBySel(totalPrice)
      .invoke("attr", "data-value")
      .should(compare, value.toString());
    return this;
  }

  compareTotalCartItemCount(value: number, compare: "eq" | "be.gt" | "be.lt") {
    cy.getBySel(totalCartItems)
      .invoke("attr", "data-value")
      .should(compare, value.toString());
    return this;
  }

  cartTotalShouldEq(value: number) {
    this.compareCartTotal(value, "eq");
    return this;
  }

  totalCartItemCountShouldEq(value: number) {
    this.compareTotalCartItemCount(value, "eq");
    return this;
  }
}
