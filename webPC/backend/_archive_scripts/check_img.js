const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.sanPham.findMany({take: 7, select: {hinh_anh: true}});
  console.log(p);
}
main().finally(async () => await prisma.$disconnect());
