import {
  LoginFormActions,
} from "../auth/login-form/login-form-actions";

const loginFormActions = new LoginFormActions();

export class MyOrdersPageActions {
  visit() {
    loginFormActions
     .visit().checkAuthUserLogin();
    cy.visit("/my-orders");
    cy.waitForProgressBar();
    return this;
  }
}
