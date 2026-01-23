import { loginFormSelectors } from "./utils";
import { Base } from "../common";
const { loginBtn, signupFormBtn, signupHeader, userAvatar } =
  loginFormSelectors;

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
  checkAuthUserLogin() {
    cy.intercept("**/api/**", (req) => {
      req.on("response", (res) => {
        if (res.statusCode >= 500) {
          throw new Error(
            `API ${req.method} ${req.url} failed with ${
              res.statusCode
            }\n${JSON.stringify(res.body)}`
          );
        }
      });
    });
    const loginInterAlias = loginInterceptor();
    this.enterEmail("test11@gmail.com")
      .enterPassword("123456")
      .clickOnLoginBtn();

    cy.wait(loginInterAlias);
    cy.waitForProgressBar();

    //check for user avatar
    cy.getBySel(userAvatar);
    return this;
  }
}

export const loginInterceptor = () => {
  const loginInterAlias = "login-interceptor";
  cy.intercept("POST", "/api/login").as(loginInterAlias);
  return "@" + loginInterAlias;
};
