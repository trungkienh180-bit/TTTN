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
    buildItem('Model', 'Colorful GeForce RTX 5060 Ti Gaming DUO 8GB-V'),
    buildItem('Chip Series', 'GeForce® RTX 5060 Ti'),
    buildItem('Product Series', 'Colorful Series'),
    buildItem('CUDA Cores', '4608'),
    buildItem('Core Clock', 'Base: 2407Mhz; Boost: 2572Mhz'),
    buildItem('Memory Size', '8GB GDDR7 (128bit)'),
    buildItem('Memory Clock', '28Gbps'),
    buildItem('Memory Bandwidth', '448GB/s'),
    buildItem('Display Ports', '3*DP2.1b + HDMI2.1b'),
    buildItem('Power Connector', '8pin'),
    buildItem('TDP', '180W (Đề xuất nguồn 600W)'),
    buildItem('Công nghệ', 'DLSS 4, Reflex, Studio, Auto Stop'),
    buildItem('DirectX', 'DirectX 12 Ultimate/OpenGL 4.6'),
    buildItem('Kích thước', '200 x 120 x 40 mm (0.69 kg)')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card Màn Hình Colorful GeForce RTX 5060 Ti Gaming DUO 8GB-V',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100709_card_man_hinh_colorful_geforce_rtx_5060_ti_gaming_duo_8gb_v__1_.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100709_card_man_hinh_colorful_geforce_rtx_5060_ti_gaming_duo_8gb_v__2_.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100709_card_man_hinh_colorful_geforce_rtx_5060_ti_gaming_duo_8gb_v__3_.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100709_card_man_hinh_colorful_geforce_rtx_5060_ti_gaming_duo_8gb_v__4_.jpg',
      gia_ban: 12490000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Colorful',
      vga: 'RTX 5060 Ti 8GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Colorful GeForce RTX 5060 Ti Gaming DUO 8GB-V');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
