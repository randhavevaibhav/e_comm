import { CheckoutPageActions } from "./checkout-page-actions";
import { GUEST_CHECKOUT_FORM_ERRORS } from "@/app/(routes)/checkout/schema/constant";
import { productsPageActions } from "../products/products-page-actions";
const checkoutPageActions = new CheckoutPageActions();

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
  miniShippingAdd
} = GUEST_CHECKOUT_FORM_ERRORS;
describe("Checkout page tests.", () => {
  beforeEach(() => {
    productsPageActions.visit();
    productsPageActions.addNItemsToCart(5);
    checkoutPageActions.visit();
  });

  it("Should show guest checkout form errors for each field when empty form submitted.", () => {
    checkoutPageActions
      .clickOnSubmitOrderBtn()
      .shouldShowGuestEmailInputError(invalidEmail)
      .shouldShowGuestNameInputError(requiredGuestName)
      .shouldShowBillingAddInputError(requiredBillingAdd)
      .shouldShowShippingAddInputError(requiredShippingAdd);
  });
  it("Should show error messages when tried to guest checkout form with wrong email and empty guest name, shipping and billing input.", () => {
    checkoutPageActions
      .enterGuestName(`      `)
      .enterGuestEmail(`Wrong email`)
      .enterBillingAddress(`    `)
      .enterShippingAddress(`     `)
      .clickOnSubmitOrderBtn()
      .shouldShowGuestNameInputError(requiredGuestName)
      .shouldShowGuestEmailInputError(invalidEmail)
      .shouldShowBillingAddInputError(requiredBillingAdd)
      .shouldShowShippingAddInputError(requiredShippingAdd);
  });

  it("Should show errors when tried to submit guest checkout form with max. character for guest name,shipping/billing add.  ", () => {
    //WERFGTYUIO - 10 char
    checkoutPageActions
      .enterGuestName("WERFGTYUIOWERFGTYUIO")
      .enterBillingAddress(
        "WERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIO",
      )
      .enterShippingAddress(
        "WERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIOWERFGTYUIO",
      )
      .clickOnSubmitOrderBtn()
      .shouldShowGuestNameInputError(maxGuestName)
      .shouldShowBillingAddInputError(maxBillingAdd)
      .shouldShowShippingAddInputError(maxShippingAdd);
  });
   it("Should show errors when tried to submit guest checkout form with min. character for guest name,shipping/billing add.  ", () => {
   
    checkoutPageActions
      .enterGuestName("WER")
      .enterBillingAddress(
        "WER",
      )
      .enterShippingAddress(
        "WER",
      )
      .clickOnSubmitOrderBtn()
      .shouldShowGuestNameInputError(miniGuestName)
      .shouldShowBillingAddInputError(miniBillingAdd)
      .shouldShowShippingAddInputError(miniShippingAdd);
  });
});
