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
    buildItem('Card màn hình', 'AMD Radeon RX 9070 XT'),
    buildItem('Dung lượng', '16GB'),
    buildItem('Bộ nhớ', 'GDDR6'),
    buildItem('Loại', '256-bit'),
    buildItem('Xung nhịp', 'Boost Clock lên đến 3100 MHz'),
    buildItem('Nguồn đề xuất', '850W'),
    buildItem('Tính năng', 'LCD Information Center, Taichi 3X Cooling, Polychrome SYNC'),
    buildItem('Bảo hành', '36 Tháng')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card màn hình ASRock Radeon RX 9070 XT Taichi White 16GB GDDR6 OC Edition',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100713_card_man_hinh_asrock_radeon_rx_9070_xt_taichi_white_16gb_gddr6_oc__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100713_card_man_hinh_asrock_radeon_rx_9070_xt_taichi_white_16gb_gddr6_oc__2_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100713_card_man_hinh_asrock_radeon_rx_9070_xt_taichi_white_16gb_gddr6_oc__3_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100713_card_man_hinh_asrock_radeon_rx_9070_xt_taichi_white_16gb_gddr6_oc__4_.png',
      gia_ban: 25990000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ASRock',
      vga: 'RX 9070 XT 16GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: ASRock Radeon RX 9070 XT');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
