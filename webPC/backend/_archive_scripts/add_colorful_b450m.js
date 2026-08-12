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
    buildItem('Sản phẩm', 'Bo mạch chủ (Mainboard)'),
    buildItem('Thương hiệu', 'Colorful (Model: BATTLE-AX B450M-T M.2 V14)'),
    buildItem('CPU hỗ trợ', 'AMD Socket AM4'),
    buildItem('Chipset', 'AMD B450 (Kích thước: Micro-ATX)'),
    buildItem('RAM hỗ trợ', '2 x DIMM, max 64GB, DDR4 Memory'),
    buildItem('Khe cắm mở rộng', '1 x PCIe 3.0 x16, 1 x PCIe 3.0 x1'),
    buildItem('Ổ cứng hỗ trợ', '1 x M.2 PCIe 3.0 x4, 4 x SATA 6Gb/s'),
    buildItem('Cổng I/O (Sau)', '2x USB 3.2 Gen1, 4x USB 2.0, HDMI 2.0 (4K 60Hz), VGA, PS/2, 3x Audio'),
    buildItem('Cổng I/O (Trong)', '1x USB 3.2 Gen1, 2x USB 2.0, CPU Fan, System Fan, COM port, Debug light'),
    buildItem('Mạng LAN', 'RTL8111H Gigabit Ethernet')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard Colorful BATTLE-AX B450M-T M.2 V14',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100414_mainboard_colorful_battle_ax_b450m_t_m_2_v14_1.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100414_mainboard_colorful_battle_ax_b450m_t_m_2_v14_3.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100414_mainboard_colorful_battle_ax_b450m_t_m_2_v14_4.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100414_mainboard_colorful_battle_ax_b450m_t_m_2_v14_5.jpg',
      gia_ban: 1590000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Colorful',
      mainboard: 'B450 Socket AM4',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Colorful BATTLE-AX B450M-T M.2 V14');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
