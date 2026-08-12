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
    buildItem('Thương hiệu', 'Sapphire (Model: PURE B850M WIFI)'),
    buildItem('CPU hỗ trợ', 'AMD Ryzen™ 7000 / 8000 / 9000 Series (Socket AM5)'),
    buildItem('Chipset', 'AMD B850 (Kích thước: Micro-ATX)'),
    buildItem('Bộ nhớ', '4 × DDR5 DIMM, tối đa 256GB, Dual Channel, hỗ trợ OC 8000MT/s'),
    buildItem('Khe PCIe', '1 × PCIe 5.0 x16, 1 × PCIe 4.0 x4'),
    buildItem('Lưu trữ', '1 × M.2 PCIe 5.0 x4, 1 × M.2 PCIe 4.0 x4, 4 × SATA 6Gb/s'),
    buildItem('Mạng & Âm thanh', 'Wi-Fi 6, Bluetooth 5.3, Realtek 2.5G LAN, ALC897 5.1 Audio'),
    buildItem('Cổng I/O sau', '1x USB-C 3.2 Gen2, 3x USB-A 3.2 Gen2, 4x USB 2.0, DP, HDMI'),
    buildItem('Hệ thống nguồn', 'VRM 12+2+1 Phase, 55A mỗi phase'),
    buildItem('Tính năng nổi bật', 'Màu trắng PURE, tản nhiệt VRM/M.2/PCH cỡ lớn, AMD EXPO')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard Sapphire PURE B850M WIFI',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100729_mainboard_sapphire_pure_b850m_wifi__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100729_mainboard_sapphire_pure_b850m_wifi__4_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100729_mainboard_sapphire_pure_b850m_wifi__3_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100729_mainboard_sapphire_pure_b850m_wifi__2_.png',
      gia_ban: 4890000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Sapphire',
      mainboard: 'B850 Socket AM5',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Mainboard Sapphire PURE B850M WIFI');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
