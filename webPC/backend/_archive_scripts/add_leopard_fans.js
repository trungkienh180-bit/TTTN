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
    buildItem('Thương hiệu', 'Jungle Leopard (Model: TF360 White ARGB)'),
    buildItem('Loại', 'Bộ 3 quạt 120mm liền khối (360mm)'),
    buildItem('Màu sắc', 'Trắng (White)'),
    buildItem('Kết nối', 'Quạt: PWM 4 Pin / LED: ARGB 5V 3 Pin'),
    buildItem('Tốc độ quay', 'Lên đến ~1800 RPM ±10%'),
    buildItem('Lưu lượng gió', '~66.6 CFM'),
    buildItem('Tính năng', 'Đồng bộ hiệu ứng ánh sáng ARGB Mainboard')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Bộ quạt tản nhiệt Jungle Leopard TF-360 ARGB White',
      danh_muc_id: 5, // Linh kiện
      hinh_anh: 'https://via.placeholder.com/600x600.png?text=Chua+co+anh', // Placeholder
      hinh_anh_1: null,
      hinh_anh_2: null,
      hinh_anh_3: null,
      gia_ban: 450000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Jungle Leopard',
      tan_nhiet: 'Bộ 3 quạt 120mm liền khối',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Jungle Leopard TF-360 ARGB White');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
