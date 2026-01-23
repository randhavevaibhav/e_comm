"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  guestCheckoutFormSchema,
  guestCheckoutFormSchemaType,
} from "@/app/(routes)/checkout/schema/index";
import { InputContainer } from "@/app/components/ui/input-container";
import { Input } from "@/app/components/ui/input";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn, sleep } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-transition-progress/next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createGuestOrderAction } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/dialog";
import { CustomSuccessToast } from "@/app/components/ui/custom-success-toast";

export const GuestCheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCartStoreSelectors();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
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

  const onSubmit = async (formData: guestCheckoutFormSchemaType) => {
    setLoading(true);

    const res = await createGuestOrderAction(formData);

    if (!res.errors) {
      toast.custom((t) => (
        <CustomSuccessToast
          t={t}
          message={res.message}
          dataTest="order-success-toast"
        />
      ));

      clearCart();
      await sleep(500);
      router.push("/products");
    } else {
      toast.error("Error while placing order !");
      console.log("Error while placing order ! ");
      console.log("Error ====> ", errors);
    }
    reset();
    setLoading(false);
  };

  const renderField = (
    name: keyof Omit<guestCheckoutFormSchemaType, "totalAmount" | "cart">,
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
            error
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none",
          )}
          data-test={`${testId}-error`}
        >
          {error || "Error"}
        </ErrorMessage>
      </div>
    );
  };

  const handleOpenDialog = async () => {
    const isValid = await trigger();
    if (isValid) {
      setShowConfirm(true);
    }
  };

  return (
    <>
      <h2 className="lg:text-4xl text-3xl font-semibold lg:mt-8 mt-6">
        Guest Checkout
      </h2>
      <form className="space-y-1  w-full  border dark:bg-input/30 border-input shadow rounded-2xl px-4 pb-4 mt-2">
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
          size="lg"
          className="mx-auto block"
          type="button"
          disabled={isLoading}
          onClick={handleOpenDialog}
          data-test={"confirm-order-btn"}
        >
          confirm Order
        </Button>
        <Dialog
          open={showConfirm}
          onOpenChange={(open) => setShowConfirm(open)}
        >
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Are you sure to place order?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 lg:flex-row flex-col">
              <Button
                size="lg"
                className=" lg:flex-1"
                type="submit"
                data-test={"submit-order-btn"}
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Submit Order
              </Button>
              <Button
                size="lg"
                className="block border lg:flex-1"
                type="button"
                variant="secondary"
                disabled={isLoading}
                onClick={() => setShowConfirm(false)}
              >
                cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};
