import { checkoutInterceptor } from "@Cypress/utils";
import {
  AuthUserCheckoutFormAction,
} from "./auth-user-checkout-form-actions";

import { AUTH_USER_CHECKOUT_FORM_ERRORS } from "@/app/(routes)/checkout/schema/index";
const authUserCheckoutFormActions = new AuthUserCheckoutFormAction();

const {
  requiredBillingAdd,
  requiredShippingAdd,
  maxBillingAdd,
  maxShippingAdd,
  miniBillingAdd,
  miniShippingAdd,
} = AUTH_USER_CHECKOUT_FORM_ERRORS;

describe("Auth user checkout form tests.", () => {
  beforeEach(() => {
    authUserCheckoutFormActions.visit()
  });

  it("Should show auth user checkout order form errors for each field when empty form submitted.", () => {
    authUserCheckoutFormActions
      .clickOnConfirmOrderBtn()
      .shouldShowBillingAddInputError(requiredBillingAdd)
      .shouldShowShippingAddInputError(requiredShippingAdd);
  });

  it("Should show errors when tried to submit auth user checkout order form with max. character for guest name,shipping/billing add.  ", () => {
    //WERFGTYUIO - 10 char
   
    authUserCheckoutFormActions
      .enterBillingAddress(
        "WERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIO",
      )
      .enterShippingAddress(
        "WERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIO",
      )
      .clickOnConfirmOrderBtn()
      .shouldShowBillingAddInputError(maxBillingAdd)
      .shouldShowShippingAddInputError(maxShippingAdd);
  });

  it("Should show errors when tried to submit auth user checkout order form with min. character for guest name,shipping/billing add.  ", () => {
    authUserCheckoutFormActions

      .enterBillingAddress("WER")
      .enterShippingAddress("WER")
      .clickOnConfirmOrderBtn()
      .shouldShowBillingAddInputError(miniBillingAdd)
      .shouldShowShippingAddInputError(miniShippingAdd);
  });
  it("Should submit guest checkout order form and show order success toast. ", () => {
    const {checkoutInterAlias} = checkoutInterceptor();
    authUserCheckoutFormActions
      .enterBillingAddress("Test Billing Address")
      .enterShippingAddress("Test Shipping Address")
      .clickOnConfirmOrderBtn()
      .clickOnSubmitOrderBtn();

    cy.wait(checkoutInterAlias);
    authUserCheckoutFormActions.shouldShowOrderSuccessToast();
  });
});
