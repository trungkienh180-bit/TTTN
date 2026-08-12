const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const product = await prisma.sanPham.findFirst({
    where: { ten_san_pham: { contains: 'SSTC S2720G' } }
  });

  if (product) {
    await prisma.sanPham.update({
      where: { id: product.id },
      data: { hinh_anh: 'https://ttgshop.vn/media/product/1072100755_man_hinh_gaming_sstc_s2720g_27_inch__2_.png' }
    });
    console.log("Updated image for:", product.ten_san_pham);
  } else {
    // If it doesn't exist, I should create it based on previous specs:
    // "Màn hình Gaming SSTC S2720G, Giá: 2.890.000 VNĐ, 27 inch IPS Full HD 200Hz 1ms"
    let category = await prisma.danhMuc.findFirst({
      where: { ten_danh_muc: { contains: 'Màn hình' } }
    });
    
    if (!category) {
      category = await prisma.danhMuc.create({ data: { ten_danh_muc: "Màn hình" } });
    }
    
    const newProduct = await prisma.sanPham.create({
      data: {
        danh_muc_id: category.id,
        ten_san_pham: 'Màn hình Gaming SSTC S2720G',
        gia_ban: 2890000,
        so_luong: 20,
        hang_san_xuat: 'SSTC',
        hinh_anh: 'https://ttgshop.vn/media/product/1072100755_man_hinh_gaming_sstc_s2720g_27_inch__2_.png',
        la_moi: true,
        mo_ta: `
<h2>Bảng Thông Số Kỹ Thuật Chi Tiết</h2>
<ul>
  <li><strong>Model:</strong> S2720G</li>
  <li><strong>Kích thước:</strong> 27 inch</li>
  <li><strong>Tấm nền:</strong> IPS</li>
  <li><strong>Độ phân giải:</strong> Full HD (1920 x 1080)</li>
  <li><strong>Tần số quét:</strong> 200Hz</li>
  <li><strong>Thời gian phản hồi:</strong> 1ms</li>
</ul>
        `.trim()
      }
    });
    console.log("Created product:", newProduct.ten_san_pham);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
