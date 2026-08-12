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
    buildItem('Thương hiệu', 'JONSBO (Model: TX-360 BLACK)'),
    buildItem('Loại', 'Tản nhiệt nước AIO (360mm)'),
    buildItem('Công suất tản nhiệt', 'D-TDP 325W'),
    buildItem('Tương thích', 'Intel (LGA1200/115X/17XX/1851), AMD (AM4/AM5)'),
    buildItem('Tốc độ bơm', '5000 RPM (±10%)'),
    buildItem('Tốc độ quạt', '700 - 2400 RPM'),
    buildItem('Kích thước Rad', '397 x 120 x 27 mm')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Tản nhiệt nước AIO JONSBO TX-360 BLACK',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100687_tan_nhiet_nuoc_aio_jonsbo_tx_360_black__3_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100687_tan_nhiet_nuoc_aio_jonsbo_tx_360_black__9_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100687_tan_nhiet_nuoc_aio_jonsbo_tx_360_black__8_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100687_tan_nhiet_nuoc_aio_jonsbo_tx_360_black__7_.png',
      gia_ban: 3390000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'JONSBO',
      tan_nhiet: 'Tản nước AIO 360mm',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: AIO JONSBO TX-360 BLACK');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
