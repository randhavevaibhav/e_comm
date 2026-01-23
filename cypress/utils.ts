export const checkoutInterceptor = () => {
  const checkoutInterAlias = "checkout-post-interceptor";
  cy.intercept("POST", "/checkout").as(checkoutInterAlias);
  return {
    checkoutInterAlias:"@" + checkoutInterAlias
  }
};

export const validateSessionInterceptor = () => {
  const validateSessionInterAlias = "validate-session-get-interceptor";
  cy.intercept("GET", "/api/validate-session").as(validateSessionInterAlias);
    return {
    validateSessionInterAlias:"@" + validateSessionInterAlias
  }
};