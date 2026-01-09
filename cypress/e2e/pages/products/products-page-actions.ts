import { MegaMenuActions } from "@Cypress/e2e/components/mega-menu/mega-menu-actions";
import { productsPageSelectors } from "./utils";

const {
  incItemCountBtn,
  decItemCountBtn,
  addItemBtn,
  totalCartItems,
  itemQuantity,
  productCard,
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
    cy.wrap(parent).find(incItemCountBtn).click();
    return this;
  }
  decItemBtnClick(parent: JQuery<HTMLElement>) {
    cy.wrap(parent).find(decItemCountBtn).click();
    return this;
  }

  addItemBtnClick(parent: JQuery<HTMLElement>) {
    cy.wrap(parent).find(addItemBtn).click();
    return this;
  }

  compareItemCountCartCount(compareOp: "eq" | "be.gt" | "be.lt") {
    cy.getBySel(itemQuantity)
      .invoke("attr", "data-value")
      .then((itemQuantity) => {
        cy.getBySel(totalCartItems)
          .invoke("attr", "data-value")
          .should(compareOp, itemQuantity);
      });
    return this;
  }

  checkIncItemCount() {
    cy.getBySel(productCard).first().then(($parent) => {
      console.log("parent.find(addItemBtn) ==> ",$parent.find(addItemBtn))
      if ($parent.find(addItemBtn).length > 0) {
        this.addItemBtnClick($parent);
        this.compareItemCountCartCount("eq");
      } else {
        this.incItemBtnClick($parent);
        this.compareItemCountCartCount("eq");
      }
    });
    return this;
  }

  decItemCount() {
    return this;
  }
}
