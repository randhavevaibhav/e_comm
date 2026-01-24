"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { InputContainer } from "@/app/components/ui/input-container";
import { useForm } from "react-hook-form";
import {
  authUserCheckoutFormSchema,
  authUserCheckoutFormSchemaType,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn, sleep } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import { useRouter } from "next/navigation";
import { Link } from "react-transition-progress/next";
import { createAuthUserOrderAction } from "@/lib/actions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/components/dialog";
import { CustomSuccessToast } from "@/app/components/ui/custom-success-toast";

export const AuthUserCheckoutForm = ({ userId }: { userId: string }) => {
  const {
    register,
    reset,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(authUserCheckoutFormSchema),
  });
  const [isLoading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { clearCart, totalPrice, cart } = useCartStoreSelectors();

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
    setValue("userId", userId);
    setValue("totalAmount", totalPrice);
    setValue("cart", formattedCart);
  }, [totalPrice, userId, formattedCart]);

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



  const onSubmit = async (formData: authUserCheckoutFormSchemaType) => {
    setLoading(true);
    const res = await createAuthUserOrderAction(formData);

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
    name: keyof Omit<authUserCheckoutFormSchemaType, "totalAmount" | "cart">,
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
    <form
      className="space-y-1  w-full  border dark:bg-input/30 border-input shadow rounded-2xl px-4 pb-4 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {renderField(
        "billingAddress",
        "Enter billing address",
        "auth-user-billing-address-input",
      )}
      {renderField(
        "shippingAddress",
        "Enter shipping address",
        "auth-user-shipping-address-input",
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
        <Dialog open={showConfirm} onOpenChange={(open)=>setShowConfirm(open)} >
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
              onClick={()=>setShowConfirm(false)}
            >
              cancel
            </Button>
         </div>
          </DialogContent>
        </Dialog>
    </form>
  );
};
