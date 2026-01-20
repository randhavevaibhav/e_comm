import { guestCheckoutFormSchema } from "@/app/(routes)/checkout/schema/guest-checkout-form-schema";
import { apiGlobalErrorHandler } from "@/lib/api-global-error-handler";
import { withRateLimit } from "@/lib/rate-limiter";
import { createGuestOrder } from "@/services/order.service";
import { NextResponse } from "next/server";

export const POST = apiGlobalErrorHandler(
  withRateLimit(async (request) => {
    const body = await request.json();
    const validateOrderData = guestCheckoutFormSchema.parse(body);

    const orderId = createGuestOrder(validateOrderData);

    return new NextResponse(
      JSON.stringify({
        message: `Created new Order with order id ${orderId}`,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  }),
);
