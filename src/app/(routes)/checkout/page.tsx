import { Link } from "react-transition-progress/next";
import { CheckoutSummary } from "./_checkout-components/checkout-summary";
import { GuestCheckoutForm } from "./_checkout-components/guest-checkout-form";

const CheckoutPage = () => {
  return (
    <div className="grid lg:grid-cols-[auto_500px] grid-cols-1 pt-2">
      <div>
        <h2 className="text-2xl">Checkout</h2>
        <p>
          have a account? please log in{" "}
          <Link href={"/auth"} className="underline text-blue-500">
            here
          </Link>
        </p>

        <h2 className="text-2xl">Guest Checkout</h2>
        <GuestCheckoutForm/>
      </div>
      <div>
        <CheckoutSummary/>
      </div>
    </div>
  );
};

export default CheckoutPage;
