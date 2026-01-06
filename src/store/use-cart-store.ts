import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductWithCategorySubCategory } from "@/services/product.service";
import Decimal from "decimal.js";
type CartItem = ProductWithCategorySubCategory & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: Decimal;
  incProductCount: (product: ProductWithCategorySubCategory) => void;
  decProductCount: (id: string) => void;
  clearCart: () => void;
  removeProductFromCart: (id: string) => void;
  getProductFromCart: (id: string) => CartItem | null;
};

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,
      merge: (persistedState: any, currentState: CartStore) => {
        return {
          ...currentState,
          ...persistedState,
          // Convert the string back into a Decimal object
          totalPrice: persistedState?.totalPrice
            ? new Decimal(persistedState.totalPrice)
            : new Decimal(0),
        };
      },

      totalPrice: new Decimal(0),
      incProductCount: (product) => {
        const { cart, totalItems, totalPrice } = get();
        const existingItem = cart.find((item) => item.id === product.id);
        const decimalTotalPrice = new Decimal(totalPrice);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
        set({ totalItems: totalItems + 1 });
        //convert price to decimal for locally stored price (string)

        set({ totalPrice: decimalTotalPrice.add(new Decimal(product.price)) });
      },
      decProductCount: (id) => {
        const { cart, totalItems, totalPrice } = get();
        const existingItem = cart.find((item) => item.id === id);
        const decimalTotalPrice = new Decimal(totalPrice);

        if (!existingItem) return;

        if (existingItem.quantity > 1) {
          // If more than 1, just decrease the quantity.
          set({
            cart: cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          });
        } else {
          // If quantity is 1, remove the item entirely.
          set({
            cart: cart.filter((item) => item.id !== id),
          });
        }
        //dec. total item count and subtract item price from total price on every item removal.
        set({
          totalPrice: decimalTotalPrice.minus(new Decimal(existingItem.price)),
        });
        set({ totalItems: totalItems - 1 });
      },
      clearCart: () =>
        set({ cart: [], totalItems: 0, totalPrice: new Decimal(0) }),
      getProductFromCart: (id) => {
        const { cart } = get();

        const foundProduct = cart.find((product) => product.id === id);
        if (!foundProduct) {
          return null;
        }

        return foundProduct;
      },
      removeProductFromCart: (id) => {
        if (!id) return;

        const { cart, totalPrice, totalItems } = get();
        const productToRemove = cart.find((product) => product.id === id);
        if (!productToRemove) return;
        const filteredCartItems = cart.filter((product) => product.id != id);
        const totalProductPrice = new Decimal(productToRemove.price).mul(
          productToRemove.quantity
        );

        const decimalTotalPrice = new Decimal(totalPrice).minus(
          totalProductPrice
        );

        set({
          cart: filteredCartItems,
          totalItems: totalItems - productToRemove.quantity,
          totalPrice: decimalTotalPrice,
        });
      },
    }),

    { name: "cart-storage" } // LocalStorage key
  )
);

export const useCartStoreSelectors = () => {
  return {
    cart: useCartStore((state) => state.cart),
    incProductCount: useCartStore((state) => state.incProductCount),
    decProductCount: useCartStore((state) => state.decProductCount),
    removeProductFromCart: useCartStore((state) => state.removeProductFromCart),
    getProductFromCart: useCartStore((state) => state.getProductFromCart),
    totalItems: useCartStore((state) => state.totalItems),
    totalPrice: useCartStore((state) => state.totalPrice),
  };
};
