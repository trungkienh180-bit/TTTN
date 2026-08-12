const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking DB Connection...');
  const userCount = await prisma.nguoiDung.count();
  const productCount = await prisma.sanPham.count();
  const orderCount = await prisma.donHang.count();
  const newsCount = await prisma.tinTuc.count();
  console.log({ userCount, productCount, orderCount, newsCount });
}
main()
  .catch(e => console.error('DB Error:', e))
  .finally(() => prisma.$disconnect());
