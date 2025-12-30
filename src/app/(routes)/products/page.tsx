import { getAllProducts } from "@/services/product.service";
import { ProductList } from "./_products-components/product-list";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div>
      <h2 className="font-semibold text-2xl my-2">Product page</h2>

      <ProductList products={products} category="All Products" />
    </div>
  );
}
