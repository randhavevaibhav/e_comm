import * as z from "zod";
import { GUEST_CHECKOUT_FORM_ERRORS } from "./constant";


export const guestCheckoutFormSchema = z.object({
  guestEmail: z.email(GUEST_CHECKOUT_FORM_ERRORS.invalidEmail),
  guestName: z
    .string()
    .trim()
    .min(1, GUEST_CHECKOUT_FORM_ERRORS.requiredGuestName)
    .min(5, GUEST_CHECKOUT_FORM_ERRORS.miniGuestName)
    .max(18, GUEST_CHECKOUT_FORM_ERRORS.maxGuestName),
  billingAddress: z
    .string()
    .trim()
    .min(1, GUEST_CHECKOUT_FORM_ERRORS.requiredBillingAdd)
    .min(5, GUEST_CHECKOUT_FORM_ERRORS.miniBillingAdd)
    .max(70, GUEST_CHECKOUT_FORM_ERRORS.maxBillingAdd),
  shippingAddress: z
    .string()
    .trim()
    .min(1, GUEST_CHECKOUT_FORM_ERRORS.requiredShippingAdd)
    .min(5, GUEST_CHECKOUT_FORM_ERRORS.miniShippingAdd)
    .max(70, GUEST_CHECKOUT_FORM_ERRORS.maxShippingAdd),
  totalAmount: z.coerce.number().positive("price must be positive."),
  cart: z.array(
    z.object({
      productId: z.string("missing product id."),
      quantity: z.number().positive("quantity must be positive."),
      priceAtOrder: z.coerce.number().positive("price must be positive."),
    }),
  ),
});

export type guestCheckoutFormSchemaType = z.infer<
  typeof guestCheckoutFormSchema
>;
