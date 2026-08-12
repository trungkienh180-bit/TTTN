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
    buildItem('Nhà sản xuất', 'MSI (Model: G507T-16GTCW)'),
    buildItem('Graphic Engine', 'NVIDIA GeForce RTX 5070 Ti (8960 CUDA Cores)'),
    buildItem('Xung nhịp GPU', 'Extreme: 2580 MHz; Boost: 2572 MHz'),
    buildItem('Bộ nhớ', '16 GB GDDR7 (256-bit, 28 Gbps)'),
    buildItem('Bus Standard', 'PCI Express 5.0'),
    buildItem('Cổng kết nối', '3x DisplayPort 2.1; 1x HDMI 2.1 (Max 4 màn hình)'),
    buildItem('PSU khuyến nghị', '750W (Cổng cấp nguồn: 1x 16-pin)'),
    buildItem('Kích thước', '338 × 140 × 50 mm (Chiếm dụng 3 Slot)'),
    buildItem('Bảo hành', '36 tháng chính hãng')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'MSI GeForce RTX 5070 Ti GAMING TRIO OC WHITE 16GB',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100228_vga_msi_geforce_rtx_5070_ti_gaming_trio_oc_white_16gb_1.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100228_vga_msi_geforce_rtx_5070_ti_gaming_trio_oc_white_16gb_2.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100228_vga_msi_geforce_rtx_5070_ti_gaming_trio_oc_white_16gb_3.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100228_vga_msi_geforce_rtx_5070_ti_gaming_trio_oc_white_16gb_4.jpg',
      gia_ban: 34990000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'MSI',
      vga: 'RTX 5070 Ti 16GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: MSI GeForce RTX 5070 Ti GAMING TRIO');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
