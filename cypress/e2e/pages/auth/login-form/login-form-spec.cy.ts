import { LoginFormActions, loginInterceptor } from "./login-form-actions";
import { LOGIN_ERRORS } from "@/app/zod-schemas/auth-schema-constants";

const loginFormActions = new LoginFormActions();

describe("Login form tests", () => {
  beforeEach(() => {
    loginFormActions.visit();
  });

  it("Should show error messages when empty login form submitted.", () => {
    loginFormActions
      .clickOnLoginBtn()
      .shouldShowEmailInputError(LOGIN_ERRORS.invalidEmail)
      .shouldShowPasswordInputError(LOGIN_ERRORS.requiredPassword);
  });
  it("Should show error messages when tried to submit login form with wrong email and empty password input.", () => {
    loginFormActions
      .enterEmail(`Wrong email`)
      .enterPassword(`     `)
      .clickOnLoginBtn()
      .shouldShowEmailInputError(LOGIN_ERRORS.invalidEmail)
      .shouldShowPasswordInputError(LOGIN_ERRORS.requiredPassword);
  });

  it("Should show error messages when tried to submit login form with max. characters in password input.", () => {
    loginFormActions
      .enterEmail(`testRT343@gmail.com`)
      .enterPassword(`1234567891011121314151617181920`)
      .clickOnLoginBtn()
      .shouldShowPasswordInputError(LOGIN_ERRORS.maxPassword);
  });
  it("Should show error messages when tried to submit login form with min. characters in password input.", () => {
    loginFormActions
      .enterEmail(`testRT32423@gmail.com`)
      .enterPassword(`123`)
      .clickOnLoginBtn()
      .shouldShowPasswordInputError(LOGIN_ERRORS.minPassword);
  });

  it("Should show login form Error when anonymous user tries to login.", () => {
    const loginInterAlias = loginInterceptor();

    loginFormActions
    .enterEmail(`testYUOPrrt@gmail.com`)
    .enterPassword(`12345678`)
      .clickOnLoginBtn();
    
    cy.wait(loginInterAlias);
    loginFormActions.shouldShowSubmitFormError(`Error while submitting form !!`)
  });

   it("Should show signup form when clicked on signup from button", () => {
    loginFormActions
      .clickOnSignupFormBtn().shouldShowSignupForm()
  });
});
