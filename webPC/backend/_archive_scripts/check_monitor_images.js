const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const monitors = await prisma.sanPham.findMany({
    where: { danh_muc: { ten_danh_muc: { contains: 'Màn hình' } } },
    select: { id: true, ten_san_pham: true, hinh_anh: true, hinh_anh_1: true, hinh_anh_2: true, hinh_anh_3: true }
  });
  console.log(JSON.stringify(monitors, null, 2));
}

main().finally(() => prisma.$disconnect());
