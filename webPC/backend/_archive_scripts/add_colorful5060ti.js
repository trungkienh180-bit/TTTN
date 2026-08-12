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
    buildItem('Model', 'Colorful GeForce RTX 5060 Ti Gaming DUO 16GB-V'),
    buildItem('Chipset', 'GeForce RTX 5060 Ti'),
    buildItem('CUDA Cores', '4608'),
    buildItem('Xung nhịp', 'Base 2407MHz / Boost 2572MHz'),
    buildItem('Bộ nhớ', '16GB GDDR7'),
    buildItem('Bus bộ nhớ', '128-bit'),
    buildItem('Tốc độ bộ nhớ', '28Gbps'),
    buildItem('Băng thông', '448GB/s'),
    buildItem('Cổng kết nối', '3 x DisplayPort 2.1b, 1 x HDMI 2.1b'),
    buildItem('Công suất tiêu thụ', '180W'),
    buildItem('Nguồn đề xuất', '600W'),
    buildItem('Đầu cấp nguồn', '1 x 8-pin'),
    buildItem('Công nghệ', 'DLSS 4, Reflex, Studio'),
    buildItem('API hỗ trợ', 'DirectX 12 Ultimate, OpenGL 4.6'),
    buildItem('Tản nhiệt', 'Quạt kép, Auto Stop'),
    buildItem('Kích thước', '200 x 120 x 40 mm'),
    buildItem('Trọng lượng', '0.70 kg')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card màn hình Colorful GeForce RTX 5060 Ti Gaming DUO 16GB GDDR7',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100735_vga_colorful_geforce_rtx_5060_ti_gaming_duo_16gb_1.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100735_vga_colorful_geforce_rtx_5060_ti_gaming_duo_16gb_2.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100735_vga_colorful_geforce_rtx_5060_ti_gaming_duo_16gb_3.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100735_vga_colorful_geforce_rtx_5060_ti_gaming_duo_16gb_5.jpg',
      gia_ban: 17980000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Colorful',
      vga: 'RTX 5060 Ti 16GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Colorful GeForce RTX 5060 Ti Gaming DUO');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
