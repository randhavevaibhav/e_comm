import { LoginFormActions } from "../../auth/login-form/login-form-actions";
import { productsPageActions } from "@Cypress/e2e/pages/products/products-page-actions";
import { authUserCheckoutFormSelectors } from "./utils";
import { validateSessionInterceptor } from "@Cypress/utils";

const loginFormActions = new LoginFormActions();
const {
  confirmOrderBtn,
  submitOrderBtn,
  shippingAddressInput,
  shippingAddressInputError,
  billingAddressInput,
  billingAddressInputError,
  orderSuccessToast,
} = authUserCheckoutFormSelectors;
export class AuthUserCheckoutFormAction {
  visit() {
    const { validateSessionInterAlias } = validateSessionInterceptor();
    loginFormActions.visit().checkAuthUserLogin();
    productsPageActions.visit();
    productsPageActions.addNItemsToCart(5);

    cy.visit("/checkout");
    cy.wait(validateSessionInterAlias);
    cy.waitForProgressBar();
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

  enterShippingAddress(str: string) {
    cy.getBySel(shippingAddressInput).type(str);
    return this;
  }
  enterBillingAddress(str: string) {
    cy.getBySel(billingAddressInput).type(str);
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
