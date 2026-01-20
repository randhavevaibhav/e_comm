import { Link } from "react-transition-progress/next";
import { GuestCheckoutForm } from "./_checkout-components/guest-checkout-form";
import { OrderSummary } from "@/app/components/order-summary/order-summary";

const CheckoutPage = () => {
  return (
    <div className="grid md:grid-cols-[6fr_2fr] grid-cols-1 gap-4 lg:p-6 p-3">
      <div>
        <h2 className="lg:text-5xl text-4xl font-semibold">Checkout</h2>
       
        <p className="my-2">
          have a account? please log in&nbsp;
          <Link href={"/auth"} className="underline text-blue-500">
            here
          </Link>
        </p>
    
        <GuestCheckoutForm/>
      </div>
      <div>
        <OrderSummary/>
      </div>
    </div>
  );
};

export default CheckoutPage;
