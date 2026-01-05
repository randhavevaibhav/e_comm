import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductWithCategorySubCategory } from "@/services/product.service";
import Decimal from "decimal.js";
type CartItem = ProductWithCategorySubCategory & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  totalItems:number;
  totalPrice:Decimal;
  addToCart: (product: ProductWithCategorySubCategory) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getProductFromCart: (id: string) => CartItem | null;
};

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      totalItems:0,
      totalPrice:new Decimal(0),
      addToCart: (product) => {
        const { cart,totalItems,totalPrice } = get();
        const existingItem = cart.find((item) => item.id === product.id);

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
        set({totalItems:totalItems+1})
        set({totalPrice:totalPrice.add(new Decimal(product.price))})
      },
      removeFromCart: (id) => {
        const { cart ,totalItems,totalPrice} = get();
        const existingItem = cart.find((item) => item.id === id);

        if (!existingItem) return;

        if (existingItem.quantity > 1) {
          // If more than 1, just decrease the quantity
          set({
            cart: cart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          });
        } else {
          // If quantity is 1, remove the item entirely
          set({
            cart: cart.filter((item) => item.id !== id),
          });
        }
        set({totalItems:totalItems-1})
        set({totalPrice:totalPrice.sub(new Decimal(existingItem.price))})
      },
      clearCart: () => set({cart:[],totalItems:0}),
      getProductFromCart: (id) => {
        const { cart } = get();

        const foundProduct = cart.find((product) => product.id === id);
        if (!foundProduct) {
          return null;
        }

        return foundProduct;
      },
     
    
    }),

    { name: "cart-storage" } // LocalStorage key
  )
);

export const useCartStoreSelectors = () => {
  return {
    addToCart: useCartStore((state) => state.addToCart),
    removeFromCart: useCartStore((state) => state.removeFromCart),
    getProductFromCart: useCartStore((state) => state.getProductFromCart),
  
    totalItems : useCartStore((state)=>state.totalItems),
    totalPrice : useCartStore((state)=>state.totalPrice)
  };
};
