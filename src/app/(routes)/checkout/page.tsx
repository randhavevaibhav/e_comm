import { Link } from "react-transition-progress/next";

import { OrderSummary } from "@/app/components/order-summary/order-summary";
import { CheckoutForm } from "./_checkout-components/checkout-form";

const CheckoutPage = () => {
  return (
    <div className="grid md:grid-cols-[6fr_2fr] grid-cols-1 gap-4 lg:p-6 p-3">
      <div>
        <h2 className="lg:text-5xl text-4xl font-semibold">Checkout</h2>

       

        <CheckoutForm />
      </div>
      <div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;
