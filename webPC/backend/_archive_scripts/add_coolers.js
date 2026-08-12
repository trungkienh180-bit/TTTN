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
  const cooler1 = [
    buildItem('Thương hiệu', 'Cooler Master'),
    buildItem('Loại', 'Tản nhiệt khí cho CPU (Mã: RR-D6NA-17PA-R1)'),
    buildItem('Tương thích', 'Intel (LGA1700/1200/115X), AMD (AM5/AM4)'),
    buildItem('Loại quạt', 'Addressable RGB (ARGB)'),
    buildItem('Tốc độ quạt', '650 - 1750 RPM ± 10%'),
    buildItem('Lưu lượng gió / Độ ồn', '71.93 CFM (Max) / 27.2 dBA'),
    buildItem('Chất liệu', '6 ống đồng / Lá tản nhiệt nhôm'),
    buildItem('Kích thước', '125 x 137 x 154.9 mm')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Tản nhiệt Cooler Master HYPER 620S ARGB',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100389_tan_nhiet_cooler_master_hyper_620s_argb_1.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100389_tan_nhiet_cooler_master_hyper_620s_argb_6.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100389_tan_nhiet_cooler_master_hyper_620s_argb_5.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100389_tan_nhiet_cooler_master_hyper_620s_argb_7.jpg',
      gia_ban: 790000,
      so_luong: 10,
      mo_ta: buildList(cooler1),
      hang_san_xuat: 'Cooler Master',
      tan_nhiet: 'Tản khí ARGB',
      la_moi: true
    }
  });
  console.log('Thêm thành công sản phẩm: Cooler Master HYPER 620S ARGB');

  const cooler2 = [
    buildItem('Thương hiệu', 'JONSBO (Model: TX-360 WHITE)'),
    buildItem('Loại', 'Tản nhiệt nước AIO (360mm)'),
    buildItem('Công suất tản nhiệt', 'D-TDP 325W'),
    buildItem('Tương thích', 'Intel (LGA1200/115X/17XX/1851), AMD (AM4/AM5)'),
    buildItem('Tốc độ bơm', '5000 RPM (±10%)'),
    buildItem('Tốc độ quạt', '700 - 2400 RPM (±10%)'),
    buildItem('Kích thước Rad', '397 x 120 x 27 mm')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Tản nhiệt nước AIO JONSBO TX-360 WHITE',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100688_tan_nhiet_nuoc_aio_jonsbo_tx_360_white__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100688_tan_nhiet_nuoc_aio_jonsbo_tx_360_white__10_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100688_tan_nhiet_nuoc_aio_jonsbo_tx_360_white__9_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100688_tan_nhiet_nuoc_aio_jonsbo_tx_360_white__8_.png',
      gia_ban: 3390000,
      so_luong: 10,
      mo_ta: buildList(cooler2),
      hang_san_xuat: 'JONSBO',
      tan_nhiet: 'Tản nước AIO 360mm',
      la_moi: true
    }
  });
  console.log('Thêm thành công sản phẩm: AIO JONSBO TX-360 WHITE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
