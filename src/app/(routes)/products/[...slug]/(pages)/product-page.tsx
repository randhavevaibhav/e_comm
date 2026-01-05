
import { getProductBySlug } from "@/services/product.service";

import { serializePrisma } from "@/lib/utils";
import { ProductCard } from "../../_products-components/product-card";
import { ClientOnly } from "@/app/components/client-only";

type ProductPageProps = {
  slug: string;
};

const ProductPage = async ({ slug }: ProductPageProps) => {
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>No product Found !</div>;
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
     
        <ProductCard product={serializePrisma(product)} />
   
      <h2 className="text-2xl font-medium"> Product page</h2>
    </div>
  );
};

export default ProductPage;
