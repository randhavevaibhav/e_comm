export type OrderedProduct = {
  id: string;
  orderId: string;
  name: string;
  image: string | null;
  status: "Pending" | "Delivered";
  date: Date;
  price: number;
  qty: number;
};
