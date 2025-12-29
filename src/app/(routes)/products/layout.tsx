import { Breadcrumb } from "@/app/components/ui/breadcrumb";
import { ProductsMenu } from "./_products-components/products-menu";

type ProductPageLayoutProps = {
  children: React.ReactNode;
};

const ProductPageLayout = ({ children }: ProductPageLayoutProps) => {
  return (
    <div>
      <section className="grid lg:grid-cols-[300px_auto] grid-cols-1 gap-6 lg:mx-0 mx-2">
        <Breadcrumb className={`lg:hidden flex`} />
        <ProductsMenu />
        <div>
          <Breadcrumb className={`lg:flex hidden`} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default ProductPageLayout;
