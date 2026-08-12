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
    buildItem('Thương hiệu', 'MSI (Model: A520M-A PRO)'),
    buildItem('CPU hỗ trợ', 'AMD Socket AM4'),
    buildItem('Chipset', 'AMD A520 (Kích thước: Micro-ATX)'),
    buildItem('RAM hỗ trợ', '2 x DIMM, max 64GB, DDR4 3200MHz (Lên đến 4600+ MHz A-XMP OC)'),
    buildItem('Khe cắm mở rộng', '1 x PCIe 3.0 x16, 1 x PCIe 3.0 x1'),
    buildItem('Ổ cứng hỗ trợ', '1 x M.2 slot, 4 x SATA III (Hỗ trợ RAID 0/1/10)'),
    buildItem('Cổng I/O (Sau)', '4x USB 3.2 Gen1, 2x USB 2.0, DVI-D, HDMI, 3x Audio jacks'),
    buildItem('Cổng I/O (Trong)', '2x USB 3.2 Gen1, 4x USB 2.0, 1x Serial port'),
    buildItem('Mạng LAN', 'Realtek® RTL8111H Gigabit LAN')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Mainboard MSI A520M-A PRO DDR4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100692_mainboard_msi_a520m_a_pro_ddr4__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100692_mainboard_msi_a520m_a_pro_ddr4__5_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100692_mainboard_msi_a520m_a_pro_ddr4__4_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100692_mainboard_msi_a520m_a_pro_ddr4__3_.png',
      gia_ban: 1590000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'MSI',
      mainboard: 'A520 Socket AM4',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: MSI A520M-A PRO DDR4');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
