"use client"
import { ProductCard } from "./components/product-card";
import { ProductsMenu } from "./components/products-menu";
import { usePathname } from "next/navigation"; 

export default function ProductsPage() {
  const pathname = usePathname();

  console.log(pathname.split("/"))
  return (
    <div>
      <h2 className="font-semibold text-2xl my-2">Product page</h2>
     <section className="grid lg:grid-cols-[300px_auto] grid-cols-1">
       <ProductsMenu  />
       <div className="border mt-8">
        <ProductCard/>
       </div>
     </section>
    </div>
  );
}
