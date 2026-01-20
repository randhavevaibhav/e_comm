import { OrderSummary } from "@/app/components/order-summary/order-summary";
import { CartItemList } from "./_cart-components/cart-items-list";

const CartPage = () => {
  return (
    <div className="px-2">
      <h2
        className="lg:text-5xl text-4xl font-semibold my-2"
        data-test={"cart-page-heading"}
      >
        Cart
      </h2>
      <div className={`grid lg:grid-cols-[6fr_2fr] grid-cols-1 gap-4`}>
        <CartItemList />

        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
