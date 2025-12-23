import { signupInterceptor } from "./actions/signup-form-actions";
import { SignupFormActions } from "./actions/signup-form-actions";
import { SIGNUP_ERRORS } from "@/app/zod-schemas/auth-schema-constants";

const signupFormActions = new SignupFormActions();

describe("Signup form tests", () => {
  beforeEach(() => {
    signupFormActions.visit();
  });

  it("Should show error messages when empty signup form submitted.", () => {
    signupFormActions
      .clickOnSignupBtn()
      .shouldShowUserNameInputError(SIGNUP_ERRORS.requiredUserName)
      .shouldShowEmailInputError(SIGNUP_ERRORS.invalidEmail)
      .shouldShowPasswordInputError(SIGNUP_ERRORS.requiredPassword);
  });
  it("Should show error messages when tried to submit signup form with wrong email and empty user-name,password input.", () => {
    signupFormActions
      .enterUserName(`      `)
      .enterEmail(`Wrong email`)
      .enterPassword(`     `)
      .clickOnSignupBtn()
      .shouldShowUserNameInputError(SIGNUP_ERRORS.requiredUserName)
      .shouldShowEmailInputError(SIGNUP_ERRORS.invalidEmail)
      .shouldShowPasswordInputError(SIGNUP_ERRORS.requiredPassword);
  });

  it("Should show error messages when tried to submit signup form with max. characters in user-name , password input.", () => {
    signupFormActions
      .enterUserName(`sdfsdfsdfsdfsdfsdfsdfsfdsdfsdfsdfxczczxcz`)
      .enterEmail(`testRT343@gmail.com`)
      .enterPassword(`1234567891011121314151617181920`)
      .clickOnSignupBtn()
      .shouldShowUserNameInputError(SIGNUP_ERRORS.maxUserName)
      .shouldShowPasswordInputError(SIGNUP_ERRORS.maxPassword);
  });
  it("Should show error messages when tried to submit signup form with min. characters in user-name,password input.", () => {
    signupFormActions
      .enterUserName(`sd`)
      .enterEmail(`testRT32423@gmail.com`)
      .enterPassword(`123`)
      .clickOnSignupBtn()
      .shouldShowUserNameInputError(SIGNUP_ERRORS.minUserName)
      .shouldShowPasswordInputError(SIGNUP_ERRORS.minPassword);
  });

  // Note: this test to pass user with given email in test should exist.
  it("Should show signup form error messages when tried to submit signup form with user email which is already exist.", () => {
    const signupInterAlias = signupInterceptor();
    signupFormActions
      .enterUserName(`test11`)
      .enterEmail(`test11@gmail.com`)
      .enterPassword(`123456`)
      .clickOnSignupBtn();

    cy.wait(signupInterAlias);

    signupFormActions.shouldShowSubmitFormError(
      `Error while submitting form !!`
    );
  });

  it("Should show login form when clicked on login form button", () => {
    signupFormActions.clickOnLoginFormBtn().shouldShowLoginForm();
  });
});
