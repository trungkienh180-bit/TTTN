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
    buildItem('Thương hiệu', 'Deepcool (Model: LM240)'),
    buildItem('Loại', 'Tản nhiệt nước AIO (240mm)'),
    buildItem('Két tản nhiệt (Radiator)', '282 x 120 x 27 mm'),
    buildItem('Số lượng quạt', '2 quạt 120mm (ARGB 5V 3-pin)'),
    buildItem('Tốc độ bơm', '2500 – 3400 RPM ±10%'),
    buildItem('Tốc độ quạt', '400 – 2400 RPM ±10%'),
    buildItem('Lưu lượng gió / Độ ồn', '66.23 CFM / ≤ 36.07 dB(A)')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Tản nhiệt nước Deepcool LM240',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100527_tan_nhiet_nuoc_deepcool_lm240__2_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100527_tan_nhiet_nuoc_deepcool_lm240__6_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100527_tan_nhiet_nuoc_deepcool_lm240__5_.png',
      hinh_anh_3: null,
      gia_ban: 2150000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Deepcool',
      tan_nhiet: 'Tản nước AIO 240mm',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Tản nhiệt nước Deepcool LM240');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
