import { CartPageActions } from "./cart-page-actions";

const cartPageActions = new CartPageActions();

describe("cart page tests.", () => {
  beforeEach(() => {
    cartPageActions.visit();
  });

  it("Should able to remove all products from cart and check cart total items and total price is equal to 0.", () => {
    cartPageActions
      .removeAllItems()
      .cartTotalShouldEq(0)
      .totalCartItemCountShouldEq(0);
  }); 
  it("should able to calculate and display correct total after adding or removing product.", () => {
    cartPageActions
      .incFirstItemCount()
      .computeAndCompCartTotal()
      .decFirstItemCount()
      .computeAndCompCartTotal();
  });
});
