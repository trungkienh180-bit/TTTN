const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.sanPham.updateMany({
    where: {
      ten_san_pham: 'Bộ quạt tản nhiệt Jungle Leopard TF-360 ARGB White'
    },
    data: {
      hinh_anh: 'https://ttgshop.vn/media/product/1072100635_fan_jungle_leopard_tf_360_argb_white.jpg'
    }
  });

  console.log('Cập nhật thành công ảnh sản phẩm: Jungle Leopard TF-360 ARGB White');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
