import { checkoutInterceptor } from "@Cypress/utils";
import { GuestCheckoutFormActions } from "./guest-checkout-form-actions";
import { GUEST_CHECKOUT_FORM_ERRORS } from "@/app/(routes)/checkout/schema/index";

const guestCheckoutFormActions = new GuestCheckoutFormActions();

const {
  invalidEmail,
  requiredBillingAdd,
  requiredGuestName,
  requiredShippingAdd,
  maxBillingAdd,
  maxGuestName,
  maxShippingAdd,
  miniGuestName,
  miniBillingAdd,
  miniShippingAdd,
} = GUEST_CHECKOUT_FORM_ERRORS;
describe("Guest checkout page tests.", () => {
  beforeEach(() => {
    guestCheckoutFormActions.visit();
  });

  it("Should show guest checkout order form errors for each field when empty form submitted.", () => {
    guestCheckoutFormActions
      .clickOnConfirmOrderBtn()
      .shouldShowGuestEmailInputError(invalidEmail)
      .shouldShowGuestNameInputError(requiredGuestName)
      .shouldShowBillingAddInputError(requiredBillingAdd)
      .shouldShowShippingAddInputError(requiredShippingAdd);
  });
  it("Should show error messages when tried to guest checkout order form with wrong email and empty guest name, shipping and billing input.", () => {
    guestCheckoutFormActions
      .enterGuestName(`      `)
      .enterGuestEmail(`Wrong email`)
      .enterBillingAddress(`    `)
      .enterShippingAddress(`     `)
      .clickOnConfirmOrderBtn()
      .shouldShowGuestNameInputError(requiredGuestName)
      .shouldShowGuestEmailInputError(invalidEmail)
      .shouldShowBillingAddInputError(requiredBillingAdd)
      .shouldShowShippingAddInputError(requiredShippingAdd);
  });

  it("Should show errors when tried to submit guest checkout order form with max. character for guest name,shipping/billing add.  ", () => {
    //WERFGTYUIO - 10 char
    guestCheckoutFormActions
      .enterGuestName("WERFGTYUIOWERFGTYUIO")
      .enterBillingAddress(
        "WERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIO"
      )
      .enterShippingAddress(
        "WERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIO"
      )
      .clickOnConfirmOrderBtn()
      .shouldShowGuestNameInputError(maxGuestName)
      .shouldShowBillingAddInputError(maxBillingAdd)
      .shouldShowShippingAddInputError(maxShippingAdd);
  });
  it("Should show errors when tried to submit guest checkout order form with min. character for guest name,shipping/billing add.  ", () => {
    guestCheckoutFormActions
      .enterGuestName("WER")
      .enterBillingAddress("WER")
      .enterShippingAddress("WER")
      .clickOnConfirmOrderBtn()
      .shouldShowGuestNameInputError(miniGuestName)
      .shouldShowBillingAddInputError(miniBillingAdd)
      .shouldShowShippingAddInputError(miniShippingAdd);
  });

  it("Should submit guest checkout order form and show order success toast. ", () => {
    const { checkoutInterAlias } = checkoutInterceptor();
    guestCheckoutFormActions
      .enterGuestName("Test 1234")
      .enterGuestEmail(`test234212@gmail.com`)
      .enterBillingAddress("Test Billing Address")
      .enterShippingAddress("Test Shipping Address")
      .clickOnConfirmOrderBtn()
      .clickOnSubmitOrderBtn();

    cy.wait(checkoutInterAlias);
    guestCheckoutFormActions.shouldShowOrderSuccessToast();
  });
});
