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
    buildItem('Hãng sản xuất', 'ASUS'),
    buildItem('CPU hỗ trợ', 'LGA1851 (Intel Core Ultra Series 2)'),
    buildItem('Chipset', 'Intel Z890'),
    buildItem('RAM hỗ trợ', '4 x DIMM, max 192GB, DDR5 up to 7600+ MT/s (OC)'),
    buildItem('Khe cắm mở rộng', '1x PCIe 5.0 x16, 3x PCIe 4.0 x16'),
    buildItem('Ổ cứng hỗ trợ', '3 x M.2 (1x PCIe 5.0, 2x PCIe 4.0), 6 x SATA 6Gb/s'),
    buildItem('Cổng I/O (Sau)', '1x USB-C 20Gbps, 1x USB-A 10Gbps, 4x USB 5Gbps, 2x USB 2.0, DP, HDMI'),
    buildItem('Kết nối mạng', 'Wi-Fi 7, Realtek 2.5Gb Ethernet, Bluetooth v5.4')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard ASUS PRIME Z890M-PLUS WIFI-CSM DDR5',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100737_main_asus_prime_z890m_plus_wifi_csm_1.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100737_main_asus_prime_z890m_plus_wifi_csm_4.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100737_main_asus_prime_z890m_plus_wifi_csm_3.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100737_main_asus_prime_z890m_plus_wifi_csm_5.jpg',
      gia_ban: 6190000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ASUS',
      mainboard: 'Z890 LGA1851',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: ASUS PRIME Z890M-PLUS WIFI-CSM DDR5');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
