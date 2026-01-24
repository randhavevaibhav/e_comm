import { authUserCheckoutFormSchemaType } from "@/app/(routes)/checkout/schema/index";
import { guestCheckoutFormSchemaType } from "@/app/(routes)/checkout/schema/index";
import prisma from "@/lib/prisma";
export const createGuestOrder = async (order: guestCheckoutFormSchemaType) => {
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
};

export const createUserOrder = async (
  order: authUserCheckoutFormSchemaType,
) => {
  const newOrder = await prisma.order.create({
    data: {
      userId: order.userId,
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
};

export const getOrderedProducts = async (userId: string) => {
  const products = await prisma.product.findMany({
    where: {
      orderItems: { some: { order: { userId: userId } } },
    },
    include: {
      orderItems: {
        where: { order: { userId: userId } },
        select: {
          priceAtOrder: true,
          quantity: true,
          order: {
            select: {
              id: true,
              status: true,
              orderDate: true,
              shippingAddress: true,
            },
          },
        },
      },
    },
  });
  if (products.length <= 0) {
    return null;
  }
  return products;
};

export type getOrderedProductsType = Awaited<
  ReturnType<typeof getOrderedProducts>
>;

export const getFormattedOrderedProducts = (products: getOrderedProductsType) => {
 
  return products!.flatMap((product) =>
    product.orderItems.map((item) => ({
      id: product.id,
      orderId: item.order.id,
      name: product.name,
      image: product.imageUrl,
      status: item.order.status as "Pending" | "Delivered",
      date: item.order.orderDate,
      price: item.priceAtOrder,
      qty: item.quantity,
    })),
  );
  
};
