const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find "Màn hình" category
  let category = await prisma.danhMuc.findFirst({
    where: { ten_danh_muc: { contains: 'Màn hình' } }
  });
  
  if (!category) {
    category = await prisma.danhMuc.create({
      data: { ten_danh_muc: "Màn hình" }
    });
  }
  
  const categoryId = category.id;
  
  const viox = await prisma.sanPham.create({
    data: {
      danh_muc_id: categoryId,
      ten_san_pham: 'Màn hình VIOX MF2425-V',
      gia_ban: 1790000,
      so_luong: 15,
      hang_san_xuat: 'VIOX',
      hinh_anh: 'https://ttgshop.vn/media/product/1072100712_man_hinh_may_tinh_viox_mf2425_v1__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100712_man_hinh_may_tinh_viox_mf2425_v1__3_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100712_man_hinh_may_tinh_viox_mf2425_v1__2_.png',
      la_moi: true,
      mo_ta: `
<h2>Bảng Thông Số Kỹ Thuật</h2>
<ul>
  <li><strong>Thương hiệu:</strong> VIOX</li>
  <li><strong>Model:</strong> MF2425 – V</li>
  <li><strong>Kích thước màn hình:</strong> 23.8 inch</li>
  <li><strong>Tấm nền (Panel Type):</strong> IPS</li>
  <li><strong>Đèn nền (Backlight):</strong> WLED</li>
  <li><strong>Độ phân giải:</strong> 1920 × 1080 (Full HD)</li>
  <li><strong>Tần số quét:</strong> 100 Hz</li>
  <li><strong>Cổng kết nối:</strong> 1 x HDMI, 1 x VGA</li>
  <li><strong>Nguồn vào (DC Input):</strong> DC 12V, 3A</li>
  <li><strong>Màu sắc:</strong> Đen (Black)</li>
</ul>
      `.trim()
    }
  });
  console.log("Created:", viox.ten_san_pham);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
