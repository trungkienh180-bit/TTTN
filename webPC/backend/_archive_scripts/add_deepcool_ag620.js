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
    buildItem('Thương hiệu', 'Deepcool (Model: AG620 ARGB Dual Tower WH)'),
    buildItem('Loại', 'Tản nhiệt khí (Dual Tower)'),
    buildItem('Ống dẫn nhiệt', '6 ống (6mm)'),
    buildItem('Quạt tản nhiệt', '2 quạt 120mm (LED ARGB 5V 3-pin)'),
    buildItem('Tốc độ quạt', '500 - 2200 RPM ±10%'),
    buildItem('Lưu lượng gió', 'Lên đến 68.85 CFM'),
    buildItem('Độ ồn', '≤ 30.93 dB(A)'),
    buildItem('Màu sắc', 'Trắng (White)')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Tản nhiệt khí Deepcool AG620 ARGB Dual Tower WH',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100531_tan_nhiet_khi_deepcool_ag620_argb_dual_tower_wh__3_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100531_tan_nhiet_khi_deepcool_ag620_argb_dual_tower_wh__7_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100531_tan_nhiet_khi_deepcool_ag620_argb_dual_tower_wh__6_.png',
      hinh_anh_3: null,
      gia_ban: 820000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Deepcool',
      tan_nhiet: 'Tản khí (Dual Tower)',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Tản nhiệt khí Deepcool AG620');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
