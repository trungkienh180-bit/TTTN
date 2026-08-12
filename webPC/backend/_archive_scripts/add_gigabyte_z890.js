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
    buildItem('Thương hiệu', 'GIGABYTE (Dòng: AORUS ELITE)'),
    buildItem('CPU hỗ trợ', 'LGA1851'),
    buildItem('Chipset', 'Intel Z890 (Kích thước: ATX)'),
    buildItem('RAM hỗ trợ', '4 x DIMM, max 256GB, DDR5 lên đến 9466+ MT/s (OC)'),
    buildItem('Khe cắm mở rộng', '1 x PCIe 5.0 x16, 2 x PCIe 4.0 x16 (chạy x4 mode)'),
    buildItem('Ổ cứng hỗ trợ', '4 x M.2 (1x PCIe 5.0, 3x PCIe 4.0), 4 x SATA 6Gb/s (RAID 0/1/5/10)'),
    buildItem('Cổng I/O (Sau)', '1x USB4 Type-C, 2x USB 3.2 Gen2, 3x USB 3.2 Gen1, 4x USB 2.0, DP, Audio'),
    buildItem('Mạng & Âm thanh', 'Wi-Fi 7 BE200, Bluetooth 5.4, Realtek 5GbE LAN'),
    buildItem('Cổng I/O (Trong)', '1x USB-C 3.2 Gen2, Thunderbolt connectors, 4x Fan/Pump, RGB Gen2'),
    buildItem('Tính năng nổi bật', 'Q-Flash Plus, Clear CMOS, 5Gbps LAN, Intel Wi-Fi 7')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard Gigabyte Z890 AORUS ELITE WIFI7 Plus DDR5',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100677_mainboard_gigabyte_z890_aorus_elite_wifi7_plus_ddr5__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100677_mainboard_gigabyte_z890_aorus_elite_wifi7_plus_ddr5__5_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100677_mainboard_gigabyte_z890_aorus_elite_wifi7_plus_ddr5__4_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100677_mainboard_gigabyte_z890_aorus_elite_wifi7_plus_ddr5__3_.png',
      gia_ban: 7790000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Gigabyte',
      mainboard: 'Z890 Socket LGA1851',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Gigabyte Z890 AORUS ELITE WIFI7 Plus DDR5');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
