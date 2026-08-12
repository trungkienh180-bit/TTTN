const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update Colorful
  const colorful = await prisma.sanPham.findFirst({
    where: {
      ten_san_pham: {
        contains: 'COLORFUL RTX 3060 NB DUO 12G V3 L-V'
      }
    }
  });

  if (colorful) {
    await prisma.sanPham.update({
      where: { id: colorful.id },
      data: { gia_ban: 9999000 }
    });
    console.log('Đã cập nhật giá COLORFUL thành 9,999,000');
  }

  // Update ASUS
  const asus = await prisma.sanPham.findFirst({
    where: {
      ten_san_pham: {
        contains: 'ASUS Dual GeForce RTX 5060 Ti'
      }
    }
  });

  if (asus) {
    await prisma.sanPham.update({
      where: { id: asus.id },
      data: { gia_ban: 19999000 }
    });
    console.log('Đã cập nhật giá ASUS thành 19,999,000');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
