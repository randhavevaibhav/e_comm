import * as z from "zod";

const GUEST_CHECKOUT_FORM_ERRORS = {
  invalidEmail: "Please enter valid email.",
  requiredGuestName: "Guest name cannot be empty.",
  minGuestName: "Guest name must have 5 characters.",
  maxGuestName: "Guest name can not exceed 18 characters.",
  requiredBillingAdd: "Billing address name cannot be empty.",
  miniBillingAdd: "Billing address must have 5 characters.",
  maxBillingAdd: "Billing address can not exceed 30 characters.",
  requiredShippingAdd: "Shipping address name cannot be empty.",
  miniShippingAdd: "Shipping address must have 5 characters.",
  maxShippingAdd: "Shipping address can not exceed 30 characters.",
};

export const guestCheckoutFormSchema = z.object({
  guestEmail: z.email(GUEST_CHECKOUT_FORM_ERRORS.invalidEmail),
  guestName: z
    .string()
    .trim()
    .min(1, GUEST_CHECKOUT_FORM_ERRORS.requiredGuestName)
    .min(5, GUEST_CHECKOUT_FORM_ERRORS.minGuestName)
    .max(18, GUEST_CHECKOUT_FORM_ERRORS.maxGuestName),
  billingAddress: z
    .string()
    .trim()
    .min(1, GUEST_CHECKOUT_FORM_ERRORS.requiredBillingAdd)
    .min(5, GUEST_CHECKOUT_FORM_ERRORS.miniBillingAdd)
    .max(18, GUEST_CHECKOUT_FORM_ERRORS.maxBillingAdd),
  shippingAddress: z.string()
    .trim()
    .min(1, GUEST_CHECKOUT_FORM_ERRORS.requiredShippingAdd)
    .min(5, GUEST_CHECKOUT_FORM_ERRORS.miniShippingAdd)
    .max(18, GUEST_CHECKOUT_FORM_ERRORS.maxShippingAdd),
});


export type guestCheckoutFormSchemaType = z.infer<typeof guestCheckoutFormSchema>