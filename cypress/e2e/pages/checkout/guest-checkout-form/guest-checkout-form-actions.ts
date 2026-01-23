import { guestCheckoutFormSelectors } from "./utils";
import { productsPageActions } from "@Cypress/e2e/pages/products/products-page-actions";
const {
  submitOrderBtn,
  confirmOrderBtn,
  guestEmailInput,
  guestEmailInputError,
  guestNameInput,
  guestNameInputError,
  shippingAddressInput,
  shippingAddressInputError,
  billingAddressInput,
  billingAddressInputError,
  orderSuccessToast,
} = guestCheckoutFormSelectors;

export class GuestCheckoutFormActions {
  visit() {
    productsPageActions.visit();
    productsPageActions.addNItemsToCart(5);
    cy.visit("/checkout");
    cy.waitForProgressBar();
    return this;
  }
  clickOnConfirmOrderBtn() {
    cy.wait(1000);
    cy.getBySel(confirmOrderBtn).click();
    cy.wait(1000);
    return this;
  }

  clickOnSubmitOrderBtn() {
    cy.wait(1000);
    cy.getBySel(submitOrderBtn).click();
    cy.wait(1000);
    return this;
  }

  enterGuestEmail(str: string) {
    cy.getBySel(guestEmailInput).type(str);
    return this;
  }
  enterGuestName(str: string) {
    cy.getBySel(guestNameInput).type(str);
    return this;
  }
  enterShippingAddress(str: string) {
    cy.getBySel(shippingAddressInput).type(str);
    return this;
  }
  enterBillingAddress(str: string) {
    cy.getBySel(billingAddressInput).type(str);
    return this;
  }

  shouldShowGuestEmailInputError(str: string) {
    cy.getBySel(guestEmailInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("have.text", str);
    return this;
  }
  shouldShowGuestNameInputError(str: string) {
    cy.getBySel(guestNameInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("have.text", str);
    return this;
  }

  shouldShowShippingAddInputError(str: string) {
    cy.getBySel(shippingAddressInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("have.text", str);
    return this;
  }
  shouldShowBillingAddInputError(str: string) {
    cy.getBySel(billingAddressInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("have.text", str);
    return this;
  }
  shouldShowOrderSuccessToast() {
    cy.getBySel(orderSuccessToast);
    return this;
  }
}


