import {  TargetGroup } from "@/generated/client";
import prisma from "@/lib/prisma";
import { capitalize, serializePrisma } from "@/lib/utils";
import { ProductCard } from "../_products-components/product-card";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params ;
  const products = await prisma.product.findMany({
    where:{
      targetGroup:category.toUpperCase() as TargetGroup
    },
    include:{
      subCategory:{
       select:{
        name:true,
        category:{
          select:{
            name:true
          }
        }
       },
      }
    }
  });

 

 console.log("products ==> ",products)

 


  return <div> <h2 className="font-semibold text-2xl my-2"> {capitalize(category)}</h2>
  
  <div className="border grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-4 p-2">
          {products.map((product,idx)=>{
            return (<ProductCard key={`${idx}_${product.id}`} product={serializePrisma(product)}/>)
          })}
        </div>
  </div>;
};

export default CategoryPage;
