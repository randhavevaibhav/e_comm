import { loginFormSelectors } from "../utils";
import { Base } from "../../common";
const {
  loginBtn,
  signupFormBtn,
  signupHeader
} = loginFormSelectors;

export class LoginFormActions extends Base {

  visit()
  {
    cy.visit("/auth");
    return this;
  }

  clickOnLoginBtn() {
    cy.getBySel(loginBtn).click();
    return this;
  }

  clickOnSignupFormBtn() {
    cy.getBySel(signupFormBtn).click();
    return this;
  }
  shouldShowSignupForm() {
    cy.getBySel(signupHeader).should("be.visible");
  }
}


export const loginInterceptor = ()=>{
  const loginInterAlias="login-interceptor"
  cy.intercept("POST","/api/login").as(loginInterAlias);
  return "@"+loginInterAlias;
}