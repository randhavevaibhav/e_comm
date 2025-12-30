import { CategoryPage } from "./(pages)/category-page";
import ProductPage from "./(pages)/product-page";
import { SubCategoryPage } from "./(pages)/sub-category-page";

type ProductsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { slug } = await params;

  if (slug.length === 1) {
    const category = slug[0];
    return <CategoryPage category={category} />;
  } else if (slug.length === 2) {
    const subCategory = slug[1];
    return <SubCategoryPage subCategory={subCategory} />;
  } else if (slug.length === 3) {
    const slugName = slug[2];
    return <ProductPage slug={slugName} />;
  }

  console.log("slug ==> ", slug);
  return <div>Page Not found !</div>;
};

export default ProductsPage;
