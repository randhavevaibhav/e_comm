import { guestCheckoutFormSchemaType } from "@/app/(routes)/checkout/schema/guest-checkout-form-schema";
import prisma from "@/lib/prisma";
export const createGuestOrder = async(order:guestCheckoutFormSchemaType)=>{
   const newOrder = await prisma.order.create({
      data: {
        guestName: order.guestName,
        guestEmail: order.guestEmail,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        totalAmount: order.totalAmount,
        orderItems: {
          create: order.cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtOrder: item.priceAtOrder, 
          })),
        },
      },
    });

    return newOrder.id;
}