import { CartItemList } from "./_cart-components/cart-items-list";
import { CartSummary } from "./_cart-components/cart-summary";

const CartPage = () => {
  return (
    <div className="px-2">
      <h2 className="font-medium tracking-wide text-2xl">Cart Items</h2>
      <div className={`grid lg:grid-cols-[6fr_2fr] grid-cols-1 gap-4`}>
        <CartItemList />

       <div>
         <CartSummary />
       </div>
      </div>
    </div>
  );
};

export default CartPage;
