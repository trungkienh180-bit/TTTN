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
    buildItem('Thương hiệu', 'TRYX (Model: TURRIS 620 BLACK)'),
    buildItem('Loại', 'Tản nhiệt khí'),
    buildItem('Tương thích', 'Intel LGA 1851/1700, AMD AM4/AM5'),
    buildItem('Ống dẫn nhiệt', '6 ống (6mm Heat-Pipe)'),
    buildItem('Quạt tản nhiệt', '2 quạt 120mm (Tốc độ: 500 - 1850 RPM)'),
    buildItem('Độ ồn', '27.42 dBA (Kích thước: 165 x 135 x 165 mm)'),
    buildItem('Bảo hành', 'Tản nhiệt 72 tháng, Màn hình 36 tháng')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Tản nhiệt khí TRYX TURRIS 620 BLACK',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100346_tan_nhiet_khi_tryx_turris_620_black_pcm_3.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100346_tan_nhiet_khi_tryx_turris_620_black_pcm_1.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100346_tan_nhiet_khi_tryx_turris_620_black_pcm_5.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100346_tan_nhiet_khi_tryx_turris_620_black_pcm_2.jpg',
      gia_ban: 4390000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'TRYX',
      tan_nhiet: 'Tản khí (Có màn hình)',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Tản nhiệt khí TRYX TURRIS 620 BLACK');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
