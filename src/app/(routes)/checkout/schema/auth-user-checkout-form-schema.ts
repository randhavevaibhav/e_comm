import * as z from "zod";

import { AUTH_USER_CHECKOUT_FORM_ERRORS } from "./constant";
export const authUserCheckoutFormSchema = z.object({
  billingAddress: z
    .string()
    .trim()
    .min(1, AUTH_USER_CHECKOUT_FORM_ERRORS.requiredBillingAdd)
    .min(5, AUTH_USER_CHECKOUT_FORM_ERRORS.miniBillingAdd)
    .max(70, AUTH_USER_CHECKOUT_FORM_ERRORS.maxBillingAdd),
  shippingAddress: z
    .string()
    .trim()
    .min(1, AUTH_USER_CHECKOUT_FORM_ERRORS.requiredShippingAdd)
    .min(5, AUTH_USER_CHECKOUT_FORM_ERRORS.miniShippingAdd)
    .max(70, AUTH_USER_CHECKOUT_FORM_ERRORS.maxShippingAdd),
  totalAmount: z.coerce.number().positive("price must be positive."),
  cart: z.array(
    z.object({
      productId: z.string("missing product id."),
      quantity: z.number().positive("quantity must be positive."),
      priceAtOrder: z.coerce.number().positive("price must be positive."),
    }),
  ),
  userId: z.string("missing user id.").trim(),
});

export type authUserCheckoutFormSchemaType = z.infer<
  typeof authUserCheckoutFormSchema
>;
