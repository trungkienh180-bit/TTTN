const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function buildItem(label, value) {
  if (!value) return '';
  return `<strong class="font-semibold text-gray-800">${label}:</strong> ${value}`;
}

// Chú ý: Ở đây ta chỉ lưu HTML cơ bản vì frontend sẽ tự parse <strong> ra
// Nhưng ta cứ bọc <strong class="...">...</strong> để regex ở frontend ăn chuẩn.
function buildList(items) {
  return items.map(item => `<li>${item}</li>`).join('\n');
}

async function main() {
  const items = [
    buildItem('Thương hiệu', 'Gainward'),
    buildItem('Bảo hành', '36 tháng'),
    buildItem('Nhà sản xuất chipset', 'NVIDIA'),
    buildItem('Series chip đồ họa', 'GeForce RTX 50 series'),
    buildItem('Tên', 'GeForce RTX 5060Ti PYTHON III'),
    buildItem('Part-number', 'NE7506T019T1-GB2061T'),
    buildItem('Bộ nhớ', '16GB GDDR7 ( 28 Gbps / 128-bit )'),
    buildItem('Series', 'PYTHON'),
    buildItem('GPU clock', '2572 MHz (Boost)'),
    buildItem('Giao tiếp PCI', 'PCI-E 5.0'),
    buildItem('Cổng kết nối', '1 x HDMI 2.1b , 3 x DisplayPort 2.1b'),
    buildItem('Tản nhiệt', 'Tản nhiệt 3 quạt'),
    buildItem('Đầu cấp nguồn', '1 x 8-pin'),
    buildItem('Kích thước', '291.9 x 116.5 x 41.3 mm')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card Màn Hình VGA GAINWARD GEFORCE RTX 5060 TI 16GB PYTHON III 3FAN',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100736_vga_gainward_geforce_rtx_5060_ti_python_iii_16gb_1.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100736_vga_gainward_geforce_rtx_5060_ti_python_iii_16gb_2.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100736_vga_gainward_geforce_rtx_5060_ti_python_iii_16gb_3.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100736_vga_gainward_geforce_rtx_5060_ti_python_iii_16gb_4.png',
      gia_ban: 17980000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Gainward',
      vga: 'RTX 5060 Ti 16GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: GAINWARD GEFORCE RTX 5060 TI');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
