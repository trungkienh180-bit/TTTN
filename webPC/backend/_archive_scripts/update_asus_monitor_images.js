const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.sanPham.updateMany({
    where: {
      ten_san_pham: 'Màn hình Gaming ASUS TUF Gaming VG259QM5A'
    },
    data: {
      hinh_anh: 'https://ttgshop.vn/media/product/1071164411_tuf_gaming_vg259qm5a_bfc59bac5a9e4d35ba3b59bf422e08b7.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1071164411_tuf_gaming_vg259qm5a_3_fceb3c04321c4787894c4121e2e5f9cb.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1071164411_tuf_gaming_vg259qm5a_2_3b439f0fe99d43d39676ea4e41c6ec2b.jpg'
    }
  });

  console.log('Cập nhật thành công ảnh cho Màn hình ASUS TUF Gaming VG259QM5A');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
