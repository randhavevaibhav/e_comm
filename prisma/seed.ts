import prisma from "@/app/lib/prisma";
import { Prisma } from "../generated/prisma/client";

async function main() {
  console.log('Start seeding process with two categories...');

  // Optional: Clean up existing data first
  await prisma.product.deleteMany({});
  await prisma.subCategory.deleteMany({});
  await prisma.category.deleteMany({});
  console.log('Cleaned up existing data.');

  // 1. Create Top-Level Categories and their associated SubCategories in one go

  // Data structure for the categories and their nested subcategories
  const categoriesWithSubCategories: Prisma.CategoryCreateInput[] = [
    {
      name: 'Shirts',
      subCategory: {
        create: [
          { name: 'men shirts' },
          { name: 'women shirts' },
          { name: 'kids shirts' },
        ],
      },
    },
    {
      name: 'Pants',
      subCategory: {
        create: [
          { name: 'men pants' },
          { name: 'women pants' },
          { name: 'kids pants' },
        ],
      },
    },
  ];

  // Create categories and subcategories simultaneously using nested writes
  for (const categoryData of categoriesWithSubCategories) {
    await prisma.category.create({
      data: categoryData,
      include: { subCategory: true }, // Include to verify creation
    });
  }

  console.log('Created "Shirts" and "Pants" categories with subcategories.');

  // 2. Fetch all SubCategories IDs for Product linking
  const allSubCategories = await prisma.subCategory.findMany();
  const subCategoryMap = new Map(allSubCategories.map(sc => [sc.name, sc.id]));

  // 3. Create Products and Link them using the map

  const productData: Prisma.ProductCreateManyInput[] = [
    // Shirts
    {
      name: 'Classic White Oxford',
      price: 49.99,
      subCategoryId:  subCategoryMap.get('men shirts'),
      stock: 150, description: 'A timeless, crisp white cotton shirt for men.', imageUrl: 'https://media.istockphoto.com/id/515750480/photo/mans-white-t-shirt.webp?a=1&b=1&s=612x612&w=0&k=20&c=TvaSaWNScsBIDi_EkImGadVKJPhAmV0BucEetjLZQHs='
    },
    {
      name: 'Floral Summer Blouse',
      price: 35.50,
      subCategoryId: subCategoryMap.get('women shirts') ,
      stock: 85, description: 'Lightweight and airy women\'s blouse.', imageUrl: 'https://media.istockphoto.com/id/171283591/photo/african-american-woman-smiling-with-hands-in-pockets-isolated.webp?a=1&b=1&s=612x612&w=0&k=20&c=fWwBHcpRk_wPhLUGhflUhZxMRoH-TUEtqLjLfEO7u5U='
    },
    {
      name: 'Blue Pattern Kids Tee',
      price: 15.00,
      subCategoryId:  subCategoryMap.get('kids shirts') ,
      stock: 200, description: 'Fun blue t-shirt with a playful graphic print.', imageUrl: 'https://media.istockphoto.com/id/1338015450/photo/photo-of-cool-brunet-little-boy-wear-blue-t-shirt-isolated-on-teal-color-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=uD9OuJQMYnrG6wqziWg-wCUyCPc82FxA828voUtjM40='
    },
    // Pants
    {
      name: 'Slim Fit Khaki Chinos',
      price: 59.99,
      subCategoryId:subCategoryMap.get('men pants'),
      stock: 120, description: 'Versatile, slim-fit cotton chinos.', imageUrl: 'url_https://images.unsplash.com/photo-1753381686374-47ebeb5771b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEtoYWtpJTIwcGFudHN8ZW58MHwwfDB8fHww4'
    },
    {
      name: 'High-Waisted Blue Jeans',
      price: 65.00,
      subCategoryId: subCategoryMap.get('women pants') ,
      stock: 90, description: 'Stretchy, high-waisted skinny jeans for women.', imageUrl: 'https://images.unsplash.com/photo-1631112213238-b1bafeaecff3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEhpZ2gtV2Fpc3RlZCUyMEJsdWUlMjBKZWFuc3xlbnwwfDB8MHx8fDA%3D'
    },
    {
      name: 'Grey Fleece Joggers',
      price: 22.99,
      subCategoryId: subCategoryMap.get('kids pants'),
      stock: 110, description: 'Comfortable grey fleece joggers for active kids.', imageUrl: 'https://media.istockphoto.com/id/943394014/photo/stylish-sneakers-and-funny-happy-socks.webp?a=1&b=1&s=612x612&w=0&k=20&c=8rnfRN3S30fRYhYKB6kD8qB3f8q0yukvpfIoFzmAb4Q='
    },
  ];

  // Use createMany for efficiency to insert all products at once
  await prisma.product.createMany({
    data: productData
  });

  console.log(`Inserted ${productData.length} Products.`);
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });