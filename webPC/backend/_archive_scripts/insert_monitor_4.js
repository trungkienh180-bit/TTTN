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
  
  const lg = await prisma.sanPham.create({
    data: {
      danh_muc_id: categoryId,
      ten_san_pham: 'Màn hình LG UltraGear 39GX90SA-W',
      gia_ban: 32990000,
      so_luong: 10,
      hang_san_xuat: 'LG',
      hinh_anh: 'https://ttgshop.vn/media/product/1072100725_man_hinh_gaming_lg_ultragear_39gx90sa_w__5_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100725_man_hinh_gaming_lg_ultragear_39gx90sa_w__4_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100725_man_hinh_gaming_lg_ultragear_39gx90sa_w__1_.png',
      la_moi: true,
      mo_ta: `
<h2>Bảng Thông Số Kỹ Thuật Chi Tiết</h2>
<ul>
  <li><strong>Kích thước:</strong> 39 inch</li>
  <li><strong>Độ phân giải:</strong> WQHD (3440 × 1440)</li>
  <li><strong>Tỷ lệ khung hình:</strong> 21:9</li>
  <li><strong>Tấm nền:</strong> OLED</li>
  <li><strong>Độ sáng:</strong> 1300 cd/m² (@HDR 1.5% APL)</li>
  <li><strong>Màu sắc hiển thị:</strong> 1.07 tỷ màu, DCI-P3 98.5% (CIE1976)</li>
  <li><strong>Độ tương phản:</strong> 1.5M:1 (Typ.)</li>
  <li><strong>Tần số quét:</strong> 240Hz</li>
  <li><strong>Thời gian đáp ứng:</strong> 0.03ms (GtG at Faster)</li>
  <li><strong>Góc nhìn:</strong> 178° (R/L), 178° (U/D)</li>
  <li><strong>Điện năng tiêu thụ:</strong> 67 W</li>
  <li><strong>Cổng kết nối:</strong> 1 x DisplayPort, 2 x HDMI, USB-C (Power Delivery 65W, Data Transmission), USB Up-stream, USB Down-stream (2ea/ver2.0), Headphone Out, LAN</li>
  <li><strong>Tính năng thông minh:</strong> webOS 24, Smart Monitor, Wi-Fi, Bluetooth, Voice Recognition, Screen Share, AirPlay, Web Browser, Remote Desktop, Home Hub, LG ThinQ App, USB Media Player</li>
  <li><strong>Phụ kiện:</strong> Cáp nguồn, Cáp USB Type-C, Cáp DisplayPort, Cáp HDMI, Điều khiển từ xa</li>
  <li><strong>Kích thước / Cân nặng:</strong> 34.9" x 23.8" x 12.7" / 25.2 lbs (có chân đế)</li>
</ul>
      `.trim()
    }
  });
  console.log("Created:", lg.ten_san_pham);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
