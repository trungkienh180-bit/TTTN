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
  // Check or create Category "Màn Hình"
  let cat = await prisma.danhMuc.findFirst({
    where: { ten_danh_muc: { contains: 'Màn Hình' } }
  });
  if (!cat) {
    cat = await prisma.danhMuc.create({
      data: {
        ten_danh_muc: 'Màn Hình',
        mo_ta: 'Màn hình máy tính'
      }
    });
    console.log('Đã tạo danh mục Màn Hình (ID:', cat.id, ')');
  }

  const items = [
    buildItem('Thương hiệu', 'ASUS (Model: TUF Gaming VG259QM5A)'),
    buildItem('Kích thước / Tỉ lệ', '24.5 inch / 16:9'),
    buildItem('Tấm nền', 'Fast IPS (Góc nhìn: 178°/178°)'),
    buildItem('Độ phân giải', '1920 x 1080 (FHD)'),
    buildItem('Tần số quét', '240Hz'),
    buildItem('Thời gian đáp ứng', '1ms (GTG), 0.3ms (min.)'),
    buildItem('Độ sáng / Tương phản', '300 cd/m² / 1000:1 (16.7 triệu màu)'),
    buildItem('Cổng kết nối', '1x DisplayPort 1.4 (HBR2), 2x HDMI (v2.0), Earphone Jack'),
    buildItem('Tính năng nổi bật', 'ELMB Sync, VRR, Shadow Boost, Low Blue Light...')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Màn hình Gaming ASUS TUF Gaming VG259QM5A',
      danh_muc_id: cat.id,
      hinh_anh: 'https://via.placeholder.com/600x600.png?text=Asus+TUF+VG259QM5A', // placeholder
      hinh_anh_1: null,
      hinh_anh_2: null,
      hinh_anh_3: null,
      gia_ban: 3290000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ASUS',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: ASUS TUF Gaming VG259QM5A');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
