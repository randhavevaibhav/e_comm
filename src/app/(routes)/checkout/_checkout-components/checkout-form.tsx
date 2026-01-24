"use client";
import { Link } from "react-transition-progress/next";
import { AuthUserCheckoutForm } from "./auth-user-checkout-form";
import { GuestCheckoutForm } from "./guest-checkout-form";
import { useAuth } from "@/app/(routes)/auth/_auth-contexts/auth-context";
export const CheckoutForm = () => {
  const { user } = useAuth();
  if (user) {
    return <AuthUserCheckoutForm userId={user.id}/>;
  } else {
    return (
      <>
        <p className="my-2">
          have a account? please log in&nbsp;
          <Link href={"/auth"} className="underline text-blue-500">
            here
          </Link>
        </p>
        <GuestCheckoutForm />
      </>
    );
  }
};
