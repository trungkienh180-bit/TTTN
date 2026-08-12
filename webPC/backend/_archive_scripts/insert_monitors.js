const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find "Màn hình" category
  let category = await prisma.danhMuc.findFirst({
    where: { ten_danh_muc: { contains: 'Màn hình' } }
  });
  
  if (!category) {
    console.log("No category for Màn hình found, creating one.");
    category = await prisma.danhMuc.create({
      data: { ten_danh_muc: "Màn hình" }
    });
  }
  
  const categoryId = category.id;
  
  // Product 1: Màn hình Gaming SSTC S2720G
  const sstc = await prisma.sanPham.create({
    data: {
      danh_muc_id: categoryId,
      ten_san_pham: 'Màn hình Gaming SSTC S2720G',
      gia_ban: 2890000,
      so_luong: 10,
      hang_san_xuat: 'SSTC',
      hinh_anh: 'https://via.placeholder.com/600x600?text=SSTC+S2720G', // Placeholder since user didn't provide
      la_moi: true,
      mo_ta: `
<h2>Thông số kỹ thuật chi tiết:</h2>
<ul>
  <li><strong>Model:</strong> S2720G</li>
  <li><strong>Loại màn hình:</strong> LED Monitor</li>
  <li><strong>Kích thước:</strong> 27 inch (68.58 cm)</li>
  <li><strong>Tấm nền:</strong> IPS</li>
  <li><strong>Độ phân giải:</strong> Full HD (1920 x 1080)</li>
  <li><strong>Tần số quét:</strong> 200Hz</li>
  <li><strong>Thời gian phản hồi:</strong> 1ms</li>
  <li><strong>Độ sáng:</strong> 230 cd/m²</li>
  <li><strong>Độ tương phản tĩnh:</strong> 1000:1 (typical)</li>
  <li><strong>Góc nhìn:</strong> 178° / 178°</li>
  <li><strong>Khả năng hiển thị màu:</strong> 16.7 triệu màu</li>
  <li><strong>Lớp phủ màn hình:</strong> Chống chói (Matte)</li>
  <li><strong>Công nghệ bảo vệ mắt:</strong> Low Blue Light (ComfortView), Flicker-free</li>
  <li><strong>Cổng kết nối:</strong> 1 x DP, 1 x HDMI, 1 x Earphone (3.5mm)</li>
  <li><strong>Điều chỉnh chân đế:</strong> Nghiêng (-5° đến 15°)</li>
  <li><strong>Chuẩn treo tường VESA:</strong> 75 x 75 mm</li>
  <li><strong>Kích thước (có chân đế):</strong> 614.95 x 463.93 x 187.64 mm</li>
  <li><strong>Trọng lượng tịnh:</strong> 3.75 kg</li>
  <li><strong>Nguồn điện:</strong> 100 - 240 VAC / 50-60 Hz</li>
  <li><strong>Công suất tiêu thụ:</strong> 48.0 W (Tối đa) / 25.0 W (Chế độ bật)</li>
</ul>
      `.trim()
    }
  });
  console.log("Created:", sstc.ten_san_pham);

  // Product 2: Màn Hình Gaming ASUS ROG Strix OLED XG32UCWMG
  const asus = await prisma.sanPham.create({
    data: {
      danh_muc_id: categoryId,
      ten_san_pham: 'Màn Hình Gaming ASUS ROG Strix OLED XG32UCWMG',
      gia_ban: 29790000,
      so_luong: 10,
      hang_san_xuat: 'ASUS',
      hinh_anh: 'https://ttgshop.vn/media/product/1072100742_man_hinh_gaming_asus_rog_strix_oled_xg32ucwmg__2_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100742_man_hinh_gaming_asus_rog_strix_oled_xg32ucwmg__5_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100742_man_hinh_gaming_asus_rog_strix_oled_xg32ucwmg__4_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100742_man_hinh_gaming_asus_rog_strix_oled_xg32ucwmg__1_.png',
      la_moi: true,
      mo_ta: `
<h2>Thông số kỹ thuật chi tiết:</h2>
<ul>
  <li><strong>Model:</strong> ROG Strix OLED XG32UCWMG</li>
  <li><strong>Kích thước:</strong> 31.5 inch</li>
  <li><strong>Độ phân giải:</strong> 3840 x 2160 (4K UHD)</li>
  <li><strong>Tấm nền:</strong> WOLED</li>
  <li><strong>Tỷ lệ màn hình:</strong> 16:9</li>
  <li><strong>Độ phủ màu:</strong> 99% DCI-P3</li>
  <li><strong>Độ sáng tối đa (HDR):</strong> 1300 nits</li>
  <li><strong>Tỷ lệ tương phản:</strong> 1,500,000:1</li>
  <li><strong>Góc nhìn:</strong> 178°/178°</li>
  <li><strong>Màu hiển thị:</strong> 1.07 tỷ màu (10-bit)</li>
  <li><strong>Độ chính xác màu:</strong> ΔE < 2</li>
  <li><strong>HDR:</strong> HDR10</li>
  <li><strong>Tốc độ phản hồi:</strong> 0.03 ms (GtG)</li>
  <li><strong>Tần số quét:</strong> 240 Hz</li>
  <li><strong>VRR:</strong> FreeSync Premium Pro, G-SYNC Compatible</li>
  <li><strong>Tính năng AI:</strong> AI Visual, Dynamic Crosshair, Dynamic Shadow Boost</li>
  <li><strong>Chế độ GamePlus / GameVisual:</strong> Có</li>
  <li><strong>Tính năng bảo vệ OLED:</strong> ASUS OLED Care</li>
  <li><strong>Cổng kết nối:</strong> 1x DisplayPort 1.4 (DSC), 2x HDMI 2.1, 1x USB-C (DP Alt Mode, PD 15W), 3x USB 3.2 Gen 1 Type-A, Jack tai nghe</li>
  <li><strong>Tần số tín hiệu (4K):</strong> HDMI: 27–255kHz / 48–240Hz; DP/Type-C: 510–510kHz / 48–240Hz</li>
  <li><strong>Điện năng tiêu thụ:</strong> 44W</li>
  <li><strong>Nguồn điện:</strong> 100-240V, 50/60Hz</li>
  <li><strong>Điều chỉnh công thái học:</strong> Nghiêng +20°~-5°, Xoay ±15°, Nâng 0-80mm</li>
  <li><strong>Gắn tường:</strong> VESA 100x100mm</li>
  <li><strong>Hiệu ứng đèn:</strong> Aura Sync</li>
  <li><strong>Cảm biến:</strong> Neo Proximity Sensor</li>
  <li><strong>Kích thước (có chân):</strong> 71.4 x 57.9 x 27.4 cm</li>
  <li><strong>Trọng lượng (có chân):</strong> 7.3 kg</li>
  <li><strong>Chứng nhận:</strong> TÜV Flicker-Free, TÜV Low Blue Light, VESA DisplayHDR 400 True Black, AMD FreeSync Premium Pro, G-SYNC Compatible</li>
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
