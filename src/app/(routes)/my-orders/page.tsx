import { capitalize, verifyJwtToken } from "@/lib/utils";
import { MyOrderList } from "./_my-orders-components/my-orders-list";
import { getFormattedOrderedProducts, getOrderedProducts } from "@/services/order.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MyOrdersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  const user = verifyJwtToken(token?.value);

  //re-direct user to auth page if missing user token
  if (!user) {
     redirect("/auth?callbackUrl=/my-orders");
  }
  const { id: userId } = user;

  const products = await getOrderedProducts(userId);
  if (!products) {
    return (
      <div>
        <p>No products found 😕!</p>
      </div>
    );
  }

  const formattedProducts = getFormattedOrderedProducts(products)
  return (
    <div className="lg:p-0 px-3">
      <h3 className="font-semibold lg:text-5xl text-4xl pt-2 mb-6">
        {capitalize("My orders")}
      </h3>
      <MyOrderList orderedProducts={formattedProducts} />
    </div>
  );
};

export default MyOrdersPage;
