const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function buildItem(label, value) {
  if (!value) return '';
  return `<strong class="font-semibold text-gray-800">${label}:</strong> ${value}`;
}

function buildList(items) {
  return items.map(item => `<li>${item}</li>`).join('\n');
}

async function main() {
  const items = [
    buildItem('Thương hiệu', 'ASUS (Model: TUF Gaming VG279Q5R)'),
    buildItem('Kích thước / Tỉ lệ', '27 inch / 16:9'),
    buildItem('Tấm nền', 'Fast IPS (Góc nhìn: 178°/178°)'),
    buildItem('Độ phân giải', 'FHD (1920 x 1080)'),
    buildItem('Tần số quét', '200Hz'),
    buildItem('Thời gian đáp ứng', '1ms (GTG), 0.3ms (min.)'),
    buildItem('Độ sáng / Tương phản', '300 cd/m² / 1000:1 (16.7 triệu màu)'),
    buildItem('Cổng kết nối', '1x DisplayPort 1.4 (HBR2), 2x HDMI (v2.0), Earphone Jack'),
    buildItem('Tính năng nổi bật', 'ELMB, VRR (Adaptive-Sync), Shadow Boost, Low Blue Light...')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Màn hình Gaming ASUS TUF VG279Q5R',
      danh_muc_id: 13, // Màn hình
      hinh_anh: 'https://ttgshop.vn/media/product/1070324223_man_hinh_asus_tuf_gaming_vg279q5r_1_85d29d70d1084462ab8bc8280dd6e3f8.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1070324223_man_hinh_asus_tuf_gaming_vg279q5r_4_b3d4abfec2ff410daa0d70255e65368f.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1070324223_man_hinh_asus_tuf_gaming_vg279q5r_5_6543a48068294a3294c88b0353da70c4.jpg',
      hinh_anh_3: null,
      gia_ban: 3650000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ASUS',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: ASUS TUF Gaming VG279Q5R');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
