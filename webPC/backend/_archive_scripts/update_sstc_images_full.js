const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const product = await prisma.sanPham.findFirst({
    where: { ten_san_pham: { contains: 'SSTC S2720G' } }
  });

  if (product) {
    await prisma.sanPham.update({
      where: { id: product.id },
      data: { 
        hinh_anh: 'https://ttgshop.vn/media/product/1072100755_man_hinh_gaming_sstc_s2720g_27_inch__1_.png',
        hinh_anh_1: 'https://ttgshop.vn/media/product/1072100755_man_hinh_gaming_sstc_s2720g_27_inch__2_.png',
        hinh_anh_2: 'https://ttgshop.vn/media/product/1072100755_man_hinh_gaming_sstc_s2720g_27_inch__3_.png',
        hinh_anh_3: 'https://ttgshop.vn/media/product/1072100755_man_hinh_gaming_sstc_s2720g_27_inch__4_.png'
      }
    });
    console.log("Updated all 4 images for:", product.ten_san_pham);
  }
}

main().finally(() => prisma.$disconnect());
