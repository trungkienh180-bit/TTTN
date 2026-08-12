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
    buildItem('Thương hiệu', 'ASUS (Dòng: TUF GAMING)'),
    buildItem('CPU hỗ trợ', 'AMD Ryzen™ 9000 & 8000 & 7000 Series Processors'),
    buildItem('Chipset', 'AMD X870 (Kích thước: ATX)'),
    buildItem('RAM hỗ trợ', '4 x DIMM, max 192GB, DDR5 lên đến 8000+MT/s (OC), AMD EXPO'),
    buildItem('Khe cắm mở rộng', '1 x PCIe 5.0 x16, 1 x PCIe 4.0 x16 (hỗ trợ x4 mode)'),
    buildItem('Ổ cứng hỗ trợ', '4 x M.2 slots (tối đa 2x PCIe 5.0), 2 x SATA 6Gb/s'),
    buildItem('Cổng I/O (Sau)', '2x USB4 (40Gbps) Type-C, 3x USB 10Gbps, 4x USB 5Gbps, HDMI'),
    buildItem('Mạng & Âm thanh', 'Wi-Fi 7, Bluetooth v5.4, Realtek 2.5G LAN, 5 Audio jacks'),
    buildItem('Cổng I/O (Trong)', '1x USB-C 20Gbps (30W PD), 4x Chassis Fan, W_PUMP+, 1x AIO Pump'),
    buildItem('Tính năng nổi bật', 'BIOS FlashBack™ button, TUF LANGuard, ASUS AEMP')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard Asus TUF GAMING X870-PLUS WIFI DDR5',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100696_mainboard_asus_tuf_gaming_x870_plus_wifi_ddr5__2_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100696_mainboard_asus_tuf_gaming_x870_plus_wifi_ddr5__8_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100696_mainboard_asus_tuf_gaming_x870_plus_wifi_ddr5__7_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100696_mainboard_asus_tuf_gaming_x870_plus_wifi_ddr5__6_.png',
      gia_ban: 9690000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ASUS',
      mainboard: 'X870 Socket AM5',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Asus TUF GAMING X870-PLUS WIFI DDR5');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
