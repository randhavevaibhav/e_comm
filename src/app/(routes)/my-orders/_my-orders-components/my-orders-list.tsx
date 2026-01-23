import { MyOrderListItem } from "./my-order-list-item";
import { OrderedProduct } from "../_types/types";

export const MyOrderList = ({orderedProducts}:{
  orderedProducts:OrderedProduct[]
}) => {

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_auto]">
        {orderedProducts ? (
          <ul className="flex flex-col gap-2">
            {orderedProducts.map((product, idx) => {
              return (
                <MyOrderListItem
                  product={product}
                  key={`${product.orderId}_${product.id}_${idx}`}
                />
              );
            })}
          </ul>
        ) : (
          <p>No products found ! 😕</p>
        )}
        <div>sidebar</div>
      </div>
    </>
  );
};
