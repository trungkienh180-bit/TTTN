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
    buildItem('Thương hiệu', 'Colorful (Dòng: iGame)'),
    buildItem('Model', 'RTX 5080 Vulcan W OC 16GB'),
    buildItem('GPU', 'RTX 5080 (10752 CUDA Cores)'),
    buildItem('Chuẩn PCIe', '5.0'),
    buildItem('Xung nhịp', 'Base: 2295 MHz; Boost: 2617 MHz (One-Key OC: 2685 MHz)'),
    buildItem('Bộ nhớ', '16 GB GDDR7'),
    buildItem('Cổng kết nối', '1x HDMI 2.1; 3x DisplayPort 2.1 (Hỗ trợ 4 màn hình)'),
    buildItem('Hệ thống làm mát', '3 Fan'),
    buildItem('Nguồn điện', '850W (Đầu nối 1x 16-pin)'),
    buildItem('Kích thước', '360 × 148.9 × 71 mm')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card Màn Hình Colorful iGame GeForce RTX 5080 Vulcan W OC 16GB-V',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1068880452_card_man_hinh_colorful_igame_geforce_rtx_5080_vulcan_w_1_7247d893efbf4125aa7a0ae51ba7ef62.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1068880452_card_man_hinh_colorful_igame_geforce_rtx_5080_vulcan_w_5_ebc8eb3234d74273bf009fb0fe99df7f.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1068880452_card_man_hinh_colorful_igame_geforce_rtx_5080_vulcan_w_3_fb335c1588494dbcbd6b5580fd64a541.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1068880452_card_man_hinh_colorful_igame_geforce_rtx_5080_vulcan_w_2_ba3cde1660a1431885ca2a88f18bfd42.png',
      gia_ban: 49990000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Colorful',
      vga: 'RTX 5080 16GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: Colorful iGame RTX 5080 Vulcan W OC');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
