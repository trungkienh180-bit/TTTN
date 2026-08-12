const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting deletion of all Laptops...");

  // 1. Find all Laptop categories
  const laptopCategories = await prisma.danhMuc.findMany({
    where: { ten_danh_muc: { contains: 'Laptop' } }
  });

  const categoryIds = laptopCategories.map(c => c.id);

  if (categoryIds.length > 0) {
    // 2. Delete all related products (Laptops)
    const deletedProducts = await prisma.sanPham.deleteMany({
      where: { danh_muc_id: { in: categoryIds } }
    });
    console.log(`Deleted ${deletedProducts.count} laptops.`);

    // 3. Delete the categories themselves
    const deletedCategories = await prisma.danhMuc.deleteMany({
      where: { id: { in: categoryIds } }
    });
    console.log(`Deleted ${deletedCategories.count} laptop categories.`);
  } else {
    console.log("No laptop categories found.");
  }

  // Double check if any products have "Laptop" in their name but are not in a laptop category
  const leftoverLaptops = await prisma.sanPham.deleteMany({
    where: { ten_san_pham: { startsWith: 'Laptop' } }
  });
  if(leftoverLaptops.count > 0) {
     console.log(`Deleted ${leftoverLaptops.count} leftover laptops by name.`);
  }

  console.log("Deletion complete!");
}

main().finally(() => prisma.$disconnect());
