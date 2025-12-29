import { TargetGroup } from "@/generated/enums";
import prisma from "@/lib/prisma";

export const getProductByCategory = async (category: string) => {
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


export type productWithCategorySubCategory =Awaited< ReturnType<typeof getProductByCategory>>[0]