import { loginFormSelectors } from "@Cypress/e2e/pages/auth/login-form/utils";

const {
  emailInput,
  passwordInput,
  emailInputError,
  passwordInputError,
  submitFormError,
} = loginFormSelectors;

export class Base {
  enterEmail(str: string) {
    cy.getBySel(emailInput).type(str);
    return this;
  }
  enterPassword(str: string) {
    cy.getBySel(passwordInput).type(str);
    return this;
  }

  shouldShowEmailInputError(str: string) {
    cy.getBySel(emailInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("have.text", str);
    return this;
  }
  shouldShowPasswordInputError(str: string) {
    cy.getBySel(passwordInputError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("have.text", str);
    return this;
  }
  shouldShowSubmitFormError(str: string) {
    cy.getBySel(submitFormError)
      .should("be.visible")
      .should("have.class", "visible")
      .should("contain.text", str);
    return this;
  }
}

export const validateSessionInterceptor = () => {
  const validateSessionInterceptorAlias = "validate-interceptor";
  cy.intercept("GET", "/api/validate-session").as(
    validateSessionInterceptorAlias
  );

  return validateSessionInterceptorAlias;
};
