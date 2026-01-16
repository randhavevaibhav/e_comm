"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  guestCheckoutFormSchema,
  guestCheckoutFormSchemaType,
} from "./schema/guest-checkout-form-schema";
import { InputContainer } from "@/app/components/ui/input-container";
import { Input } from "@/app/components/ui/input";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

export const GuestCheckoutForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestCheckoutFormSchema),
  });

  const onSubmit = (data: guestCheckoutFormSchemaType) => {};

  const guestNameFieldErrors = errors.guestName?.message;
  const guestEmailFieldErrors = errors.guestEmail?.message;
  const billingAddressFieldErrors = errors.billingAddress?.message;
  const shippingAddressFieldErrors = errors.shippingAddress?.message;
  return (
    <form onSubmit={handleSubmit(onSubmit)}   className="space-y-1  w-full  border dark:bg-input/30 border-input shadow rounded-2xl px-8 ">
        <header className="text-2xl my-2">
            <h3>Guest info</h3>
        </header>
      <InputContainer>
        <Input placeholder="Enter name" {...register("guestName")} />
      </InputContainer>
      <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": guestNameFieldErrors,
            "opacity-0 invisible": !guestNameFieldErrors,
          },
          "ml-2"
        )}
        data-test={`email-input-error`}
      >
        {guestNameFieldErrors ? guestNameFieldErrors : `Error`}
      </ErrorMessage>
      <InputContainer>
        <Input placeholder="Enter email" {...register("guestEmail")} />
      </InputContainer>
       <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": guestEmailFieldErrors,
            "opacity-0 invisible": !guestEmailFieldErrors,
          },
          "ml-2"
        )}
        data-test={`email-input-error`}
      >
        {guestEmailFieldErrors ? guestEmailFieldErrors : `Error`}
      </ErrorMessage>
      <InputContainer>
        <Input
          placeholder="Enter billing address"
          {...register("billingAddress")}
        />
      </InputContainer>
        <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": billingAddressFieldErrors,
            "opacity-0 invisible": !billingAddressFieldErrors,
          },
          "ml-2"
        )}
        data-test={`email-input-error`}
      >
        {billingAddressFieldErrors ? billingAddressFieldErrors : `Error`}
      </ErrorMessage>
      <InputContainer>
        <Input
          placeholder="Enter shipping address"
          {...register("shippingAddress")}
        />
      </InputContainer>
         <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": shippingAddressFieldErrors,
            "opacity-0 invisible": !shippingAddressFieldErrors,
          },
          "ml-2"
        )}
        data-test={`email-input-error`}
      >
        {shippingAddressFieldErrors ? shippingAddressFieldErrors : `Error`}
      </ErrorMessage>
      <Button>
        Submit
      </Button>
    </form>
  );
};
