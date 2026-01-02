import { Breadcrumb } from "@/app/components/ui/breadcrumb";


type ProductPageLayoutProps = {
  children: React.ReactNode;
};

const ProductPageLayout = ({ children }: ProductPageLayoutProps) => {
  return (
    <div>
      <section className="grid lg:grid-cols-[300px_auto] grid-cols-1 gap-6 lg:mx-0 mx-2">
        <Breadcrumb className={`lg:hidden flex flex-wrap`} />

        <div className="lg:block hidden">
          <h4 className="font-semibold text-xl m-2">Some Menu</h4>
        
        </div>

        <div>
          <Breadcrumb className={`lg:flex hidden flex-wrap`} />

          {children}
        </div>
      </section>
    </div>
  );
};

export default ProductPageLayout;
