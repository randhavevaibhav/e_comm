import { cartPageSelectors } from "./utils";
import { productsPageActions } from "../products/products-page-actions";
const {
  removeItemBtn,
  itemQuantity,
  itemPrice,
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

  

 removeAllItems() {
  cy.getBySel(cartItem).then(($items) => {
    const itemCount = $items.length;
    //standard loop to avoid stale element references from .each()
    for (let i = 0; i < itemCount; i++) {
      // Re-query the first item every time to ensure it is attached to the DOM
      cy.getBySel(cartItem).first().within(() => {
        cy.get(`[data-test=${removeItemBtn}]`).click();
      });
      // Wait for the item to actually disappear before the next loop to prevents the next iteration from trying to click a disappearing element
      cy.getBySel(cartItem).should('have.length', itemCount - i - 1);
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
