const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteGenerated() {
  const result1 = await prisma.sanPham.deleteMany({
    where: {
      ten_san_pham: {
        contains: '(Mã SP:'
      }
    }
  });
  
  const result2 = await prisma.sanPham.deleteMany({
    where: {
      ten_san_pham: {
        contains: 'Phiên bản'
      }
    }
  });

  console.log(`Deleted ${result1.count + result2.count} products.`);
}

deleteGenerated()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
