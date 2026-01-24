"use server";
import { authUserCheckoutFormSchema, authUserCheckoutFormSchemaType, guestCheckoutFormSchema, guestCheckoutFormSchemaType } from "@/app/(routes)/checkout/schema/index";
import { createGuestOrder, createUserOrder } from "@/services/order.service";
import * as z from "zod";
export const createGuestOrderAction = async (formData:guestCheckoutFormSchemaType) => {
  const validatedFields = guestCheckoutFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      message: "Please fix the errors below.",
    };
  }

  const orderId = await createGuestOrder(validatedFields.data);
  return { message: "Order placed successfully!", orderId ,errors:null};
};

export const createAuthUserOrderAction = async (formData:authUserCheckoutFormSchemaType) => {
  const validatedFields = authUserCheckoutFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
      message: "Please fix the errors below.",
    };
  }

  const orderId = await createUserOrder(validatedFields.data);
  return { message: "Order placed successfully!", orderId ,errors:null};
};
