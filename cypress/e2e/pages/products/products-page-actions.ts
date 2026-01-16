import { MegaMenuActions } from "@Cypress/e2e/components/mega-menu/mega-menu-actions";
import { productsPageSelectors } from "./utils";

const {
  incItemCountBtn,
  decItemCountBtn,
  addItemBtn,
  totalCartItems,
  itemQuantity,
  productCard,
  productPageHeading,
  productsMegaMenu,
  productsMegaMenuToggle,
} = productsPageSelectors;

export class ProductPageActions extends MegaMenuActions {
  visit() {
    cy.visit("/products");
    cy.waitForProgressBar();
    return this;
  }

  getTotalItemCountInCart() {
    return this;
  }

  incItemBtnClick(parent: JQuery<HTMLElement>) {
    cy.wrap(parent).find(`[data-test=${incItemCountBtn}]`).click();
    return this;
  }
  decItemBtnClick(parent: JQuery<HTMLElement>) {
    cy.wrap(parent).find(`[data-test=${decItemCountBtn}]`).click();
    return this;
  }

  addItemBtnClick(parent: JQuery<HTMLElement>) {
    cy.wrap(parent).find(`[data-test=${addItemBtn}]`).click();
    return this;
  }

  compareCartCountToItemCount(compare: "eq" | "be.gt" | "be.lt") {
    cy.getBySel(itemQuantity)
      .invoke("attr", "data-value")
      .then((itemQuantity) => {
        cy.getBySel(totalCartItems)
          .invoke("attr", "data-value")
          .should(compare, itemQuantity);
      });
  }

  cartCountShouldBeEqItemCount() {
    this.compareCartCountToItemCount("eq");
    return this;
  }

  cartCountShouldBeGtItemCount() {
    this.compareCartCountToItemCount("be.gt");
    return this;
  }

  cartCountShouldBeLtItemCount() {
    this.compareCartCountToItemCount("be.lt");
    return this;
  }

  cartCountShouldBeEq(quantity: number) {
    cy.getBySel(totalCartItems)
      .invoke("attr", "data-value")
      .should("eq", quantity.toString());

    return this;
  }

  clickOnFirstProduct() {
    cy.wait(500);
    cy.getBySel(productCard).first().click();
    return this;
  }

  checkNavToProductPage() {
    cy.getBySel(productPageHeading).should("be.visible");
  }

  addNItemsToCart(n: number) {
    cy.wait(300);
    cy.getBySel(productCard).each(($ele, idx, list) => {
      const totalElements = list.length;
      if (n > totalElements) {
        throw new Error(`No. of products to be added exceed present no. of product on page.\n
          received: ${n}\n
          present: ${totalElements}`);
      }
      if (idx < n) {
        cy.wrap($ele).find(`[data-test=${addItemBtn}]`).click();
      }
    });
  }

  checkIncDecItemCount() {
    cy.wait(500);
    cy.getBySel(productCard)
      .first()
      .then(($parent) => {
        cy.wait(500);
        const hasAddBtn = cy.wrap($parent).find(`[data-test=${addItemBtn}]`);

        if (hasAddBtn) {
          this.addItemBtnClick($parent);
          this.cartCountShouldBeEqItemCount();
          cy.wait(300);
          this.decItemBtnClick($parent);
          //directly comp. 0 with total cart items because UI does
          //not show 0 for item count it shows Add item button
          this.cartCountShouldBeEq(0);
        } else {
          this.incItemBtnClick($parent);
          this.cartCountShouldBeEqItemCount();
          cy.wait(300);
          this.decItemBtnClick($parent);
          this.cartCountShouldBeEqItemCount();
        }
      });
    return this;
  }
}

export const productsPageActions = new ProductPageActions(
  productsMegaMenu,
  productsMegaMenuToggle
);
