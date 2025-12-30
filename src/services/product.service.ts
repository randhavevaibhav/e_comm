import { TargetGroup } from "@/generated/enums";
import prisma from "@/lib/prisma";

export const getProductsByCategory = async (category: string) => {
  return await prisma.product.findMany({
    where: {
      targetGroup: category.toUpperCase() as TargetGroup,
    },
    include: {
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const getProductsBySubCategory = async (subCategory: string) => {
  return await prisma.product.findMany({
    where: {
      subCategory: {
        name: subCategory,
      },
    },
    include: {
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const getProductBySlug = async (slug: string) => {
  
  return await prisma.product.findUnique({
    where:{
      slug:slug
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
        }
      }
    }
  });
};

export const getAllProducts = async()=>{
  return await prisma.product.findMany({
     include:{
      subCategory:{
        select:{
          name:true,
          category:{
            select:{
              name:true
            }
          }
        }
      }
    }
  })
}

export type productWithCategorySubCategory = Awaited<
  ReturnType<typeof getProductsByCategory>
>[0];
