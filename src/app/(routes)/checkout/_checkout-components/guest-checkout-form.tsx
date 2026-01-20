"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  guestCheckoutFormSchema,
  guestCheckoutFormSchemaType,
} from "../schema/guest-checkout-form-schema";
import { InputContainer } from "@/app/components/ui/input-container";
import { Input } from "@/app/components/ui/input";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-transition-progress/next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const GuestCheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCartStoreSelectors();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestCheckoutFormSchema),
  });

  const formattedCart = useMemo(
    () =>
      cart.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantity,
          priceAtOrder: item.price,
        };
      }),
    [cart],
  );

  useEffect(() => {
    setValue("totalAmount", totalPrice);
    setValue("cart", formattedCart);
  }, [totalPrice, formattedCart]);

  if (cart.length <= 0) {
    return (
      <div>
        <p className="text-base my-2">
          No products added ! please add products to cart &nbsp;
          <Link href={"/products"} className="text-blue-500 underline">
            here
          </Link>
        </p>
      </div>
    );
  }

  const submitOrder = async (formData: guestCheckoutFormSchemaType) => {
    try {
      const response = await fetch("/api/order/guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const { message } = await response.json();
        console.log(`Order submit failed with status ${response.status}`);
        throw new Error(
          `Error while submitting order ! 😕 \n${message ? message : ""}`,
        );
      }

      toast.success(`Order submitted ! 😄`);
      //clear local cart,reset form after success. and redirect to products page.

      clearCart();
      router.push("/products");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error ==> ", error);
        toast.error(error.message);
      } else {
        console.log("Unknown Error ==> ", error);
        toast.error(`Unknown error occurred !`);
      }
    }
    reset();
  };

  const onSubmit = async (formData: guestCheckoutFormSchemaType) => {
    setLoading(true);
    await submitOrder(formData);
    setLoading(false);
  };
  
  const renderField = (
    name: keyof Omit<guestCheckoutFormSchemaType,"totalAmount"|"cart">,
    placeholder: string,
    testId: string,
  ) => {
    const error = errors[name]?.message as string | undefined;
    return (
      <div className="space-y-1">
        <InputContainer>
          <Input
            placeholder={placeholder}
            {...register(name)}
            className="w-full"
            data-test={testId}
            disabled={isLoading}
          />
        </InputContainer>
        <ErrorMessage
          className={cn(
            "ml-2",
            error ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
          )}
          data-test={`${testId}-error`}
        >
          {error || "Error"}
        </ErrorMessage>
      </div>
    );
  };

  return (
    <>
      <h2 className="lg:text-4xl text-3xl font-semibold lg:mt-8 mt-6">
        Guest Checkout
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-1  w-full  border dark:bg-input/30 border-input shadow rounded-2xl px-4 pb-4 mt-2"
      >
        <header className="lg:text-3xl test-2xl my-2">
          <h3>Guest info</h3>
        </header>
        {renderField("guestName", "Enter name", "guest-name-input")}
        {renderField("guestEmail", "Enter email", "guest-email-input")}
        {renderField(
          "billingAddress",
          "Enter billing address",
          "billing-address-input",
        )}
        {renderField(
          "shippingAddress",
          "Enter shipping address",
          "shipping-address-input",
        )}
        <Button
          size="xl"
          className="mx-auto block"
          type="submit"
          data-test={"submit-order-btn"}
          disabled={isLoading}
        >
          Submit Order
        </Button>
      </form>
    </>
  );
};
