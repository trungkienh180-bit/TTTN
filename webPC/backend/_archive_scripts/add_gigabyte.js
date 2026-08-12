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
    buildItem('Sản phẩm', 'Card màn hình - Card đồ họa - VGA'),
    buildItem('Hãng sản xuất', 'Gigabyte'),
    buildItem('Engine đồ họa', 'GeForce RTX 5060'),
    buildItem('Chuẩn Bus', 'PCI-E 5.0'),
    buildItem('Bộ nhớ', '8 GB GDDR7'),
    buildItem('Engine Clock', '2497 MHz'),
    buildItem('Lõi CUDA', '3840'),
    buildItem('Clock bộ nhớ', '28 Gbps'),
    buildItem('Giao diện bộ nhớ', '128 bit'),
    buildItem('Độ phân giải', '7680x4320'),
    buildItem('Kết nối', 'DisplayPort 2.1b *3, HDMI 2.1b *1'),
    buildItem('Kích thước', 'L=199 W=128 H=40 mm'),
    buildItem('PSU đề nghị', '450W'),
    buildItem('Power Connectors', '8 Pin * 1')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card màn hình Gigabyte GeForce RTX 5060 WINDFORCE 8GB (N5060WF2-8GD)',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100710_card_man_hinh_gigabyte_geforce_rtx_5060_windforce_8gb__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100710_card_man_hinh_gigabyte_geforce_rtx_5060_windforce_8gb__2_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100710_card_man_hinh_gigabyte_geforce_rtx_5060_windforce_8gb__4_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100710_card_man_hinh_gigabyte_geforce_rtx_5060_windforce_8gb__5_.png',
      gia_ban: 10290000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Gigabyte',
      vga: 'RTX 5060 8GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Gigabyte GeForce RTX 5060 WINDFORCE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
