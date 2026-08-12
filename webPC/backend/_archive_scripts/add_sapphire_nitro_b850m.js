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
    buildItem('Model', 'Sapphire NITRO+ B850M WIFI'),
    buildItem('CPU hỗ trợ', 'AMD Ryzen 9000/8000/7000 Series (Socket AM5)'),
    buildItem('Chipset', 'AMD B850 (Kích thước: Micro-ATX)'),
    buildItem('Khe RAM', '4x DIMM DDR5, max 256GB, OC lên đến 8000 MHz'),
    buildItem('Khe mở rộng', '1x PCIe 5.0 x16, 1x PCIe 4.0 x4'),
    buildItem('Lưu trữ', '1x M.2 PCIe 5.0, 1x M.2 PCIe 4.0, 4x SATA'),
    buildItem('Mạng & Âm thanh', 'WiFi 6, Bluetooth 5.3, Realtek 2.5G LAN, ALC897 5.1 Audio'),
    buildItem('Cổng I/O sau', '1x USB-C 3.2 Gen2, 3x USB-A 3.2 Gen2, 4x USB 2.0, DP, HDMI'),
    buildItem('Cổng I/O trước', '1x USB-C 3.2 Gen1, 2x USB-A 3.2 Gen1, 2x USB 2.0'),
    buildItem('Debug LED', 'DRAM: Vàng, CPU: Đỏ, GPU: Trắng, Boot: Xanh lá')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard Sapphire NITRO+ B850M WIFI DDR5',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100722_mainboard_sapphire_nitro_b850m_wifi_ddr5_1.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100722_mainboard_sapphire_nitro_b850m_wifi_ddr5_2.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100722_mainboard_sapphire_nitro_b850m_wifi_ddr5_3.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100722_mainboard_sapphire_nitro_b850m_wifi_ddr5_4.png',
      gia_ban: 4890000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Sapphire',
      mainboard: 'B850 Socket AM5',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Mainboard Sapphire NITRO+ B850M WIFI DDR5');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
