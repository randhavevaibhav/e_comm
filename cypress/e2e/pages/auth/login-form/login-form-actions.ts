import { loginFormSelectors } from "./utils";
import { Base } from "../common";
const { loginBtn, signupFormBtn, signupHeader } = loginFormSelectors;

export class LoginFormActions extends Base {
  visit() {
    cy.visit("/auth");
    cy.waitForProgressBar();
    return this;
  }

  clickOnLoginBtn() {
    cy.wait(1000);
    cy.getBySel(loginBtn).click();
    cy.wait(1000);
    return this;
  }

  clickOnSignupFormBtn() {
    cy.wait(1000);
    cy.getBySel(signupFormBtn).click();
    cy.wait(1000);
    return this;
  }
  shouldShowSignupForm() {
    cy.getBySel(signupHeader).should("be.visible");
  }
}

export const loginInterceptor = () => {
  const loginInterAlias = "login-interceptor";
  cy.intercept("POST", "/api/login").as(loginInterAlias);
  return "@" + loginInterAlias;
};
