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
  
  const asus = await prisma.sanPham.create({
    data: {
      danh_muc_id: categoryId,
      ten_san_pham: 'Màn hình Asus ROG Swift OLED PG27AQWP-G EDITION 20 (27 inch/OLED/QHD 540Hz & FHD 720Hz/0.02ms)',
      gia_ban: 39990000,
      so_luong: 10,
      hang_san_xuat: 'ASUS',
      hinh_anh: 'https://ttgshop.vn/media/product/1072100739_man_hinh_asus_rog_swift_oled_pg27aqwp_g_edition_20__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100739_man_hinh_asus_rog_swift_oled_pg27aqwp_g_edition_20__6_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100739_man_hinh_asus_rog_swift_oled_pg27aqwp_g_edition_20__5_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100739_man_hinh_asus_rog_swift_oled_pg27aqwp_g_edition_20__4_.png',
      la_moi: true,
      mo_ta: `
<h2>Bảng Thông Số Kỹ Thuật Chi Tiết</h2>
<ul>
  <li><strong>Model:</strong> ROG Swift OLED PG27AQWP-G EDITION 20</li>
  <li><strong>Kích thước tấm nền:</strong> 26.5 inch</li>
  <li><strong>Tỷ lệ khung hình:</strong> 16:9</li>
  <li><strong>Diện tích hiển thị (H x V):</strong> 586.75 × 330.05 mm</li>
  <li><strong>Bề mặt hiển thị:</strong> Bóng (TrueBlack Glossy)</li>
  <li><strong>Loại đèn nền / Tấm nền:</strong> OLED / WOLED (Tandem WOLED Technology)</li>
  <li><strong>Góc nhìn (CR≧10):</strong> 178°/ 178°</li>
  <li><strong>Khoảng cách điểm ảnh:</strong> 0.229mm</li>
  <li><strong>Độ phân giải:</strong> 2560×1440 (Chế độ kép hỗ trợ chuyển đổi sang HD 720Hz)</li>
  <li><strong>Độ phủ màu:</strong> 99.5% DCI-P3, 135% sRGB</li>
  <li><strong>Độ sáng (HDR, Tối đa):</strong> 1,500 cd/m²</li>
  <li><strong>Tỷ lệ tương phản (Điển hình):</strong> 1,500,000:1</li>
  <li><strong>Màu sắc hiển thị:</strong> 1073.7 triệu màu (10 bit)</li>
  <li><strong>Tốc độ phản hồi:</strong> 0.02ms (GTG)</li>
  <li><strong>Tần số quét (Tối đa):</strong> 540Hz</li>
  <li><strong>Chế độ kép (Dual Mode):</strong> Có, Tăng cường tốc độ khung hình (Frame Rate Boost lên đến 720Hz)</li>
  <li><strong>Hỗ trợ HDR:</strong> HDR10, VESA DisplayHDR 500 True Black</li>
  <li><strong>Khử nhấp nháy / Giảm nhòe:</strong> Có (Flicker-free) / Extreme Low Motion Blur</li>
  <li><strong>Bảo vệ màn hình / Cảm biến:</strong> ASUS OLED Care Pro, Cảm biến tiệm cận Neo Proximity Sensor</li>
  <li><strong>Công nghệ VRR:</strong> FreeSync™ Premium Pro & G-SYNC® Compatible</li>
  <li><strong>Cổng kết nối I/O:</strong> 1 x DisplayPort 2.1, 2 x HDMI (v2.1) FRL, Hub USB (3x USB 3.2 Gen 1 Type-A), Giắc cắm tai nghe</li>
  <li><strong>Loa:</strong> Không</li>
  <li><strong>Tiêu thụ điện năng:</strong> <55W</li>
  <li><strong>Thiết kế công thái học:</strong> Nghiêng (+20° ~ -5°), Xoay (+30° ~ -30°), Trục quay (+90° ~ -90°), Điều chỉnh chiều cao (0~110mm)</li>
  <li><strong>Hiệu ứng ánh sáng / VESA:</strong> Aura Sync / 100×100mm</li>
  <li><strong>Kích thước / Trọng lượng:</strong> 60.56 × 54.78 × 27.36 cm / 7.04 kg (có chân đế)</li>
</ul>
      `.trim()
    }
  });
  console.log("Created:", asus.ten_san_pham);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
