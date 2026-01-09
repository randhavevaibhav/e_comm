import { Base } from "../common";
import { signupFormSelectors } from "./utils";

const {
  signupBtn,
  loginFormBtn,
  loginHeader,
  signupFormBtn,
  userNameInput,
  userNameInputError,
} = signupFormSelectors;

export class SignupFormActions extends Base {
  visit() {
    cy.visit("/auth");
    cy.wait(1000);
    cy.getBySel(signupFormBtn).click();
    return this;
  }

  clickOnSignupBtn() {
    cy.getBySel(signupBtn).click();
    return this;
  }
  enterUserName(str: string) {
    cy.getBySel(userNameInput).type(str);
    return this;
  }

  shouldShowUserNameInputError(str: string) {
    cy.getBySel(userNameInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("contain.text", str);
    return this;
  }

  clickOnLoginFormBtn() {
    cy.getBySel(loginFormBtn).click();
    return this;
  }
  shouldShowLoginForm() {
    cy.getBySel(loginHeader).should("be.visible");
  }
}

export const signupInterceptor = () => {
  const signupInterAlias = "signup-interceptor";
  cy.intercept("POST", "/api/signup").as(signupInterAlias);
  return "@" + signupInterAlias;
};
