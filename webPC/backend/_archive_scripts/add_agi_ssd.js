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
    buildItem('Thương hiệu', 'AGI (Model: AI238)'),
    buildItem('Dung lượng', '512GB'),
    buildItem('Giao tiếp', 'SATA III 6Gb/s (Kích thước: 2.5 inch)'),
    buildItem('Flash NAND', '3D NAND'),
    buildItem('Tốc độ Đọc/Ghi', 'Lên đến 550 MB/s / 510 MB/s'),
    buildItem('Độ bền (MTBF)', '1.500.000 giờ'),
    buildItem('Tính năng khác', 'Chống sốc 1500G/0.5ms, Nhiệt độ h/động 0°C-70°C'),
    buildItem('Bảo hành', '36 Tháng')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD AGI AI238 512GB 2.5 inch SATA III',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100430_o_cung_ssd_agi_sata_ai238_512gb_1.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100430_o_cung_ssd_agi_ai238_512gb.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100430_o_cung_ssd_agi_sata_ai238_512gb_2.png',
      hinh_anh_3: null,
      gia_ban: 1990000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'AGI',
      o_cung: '512GB SATA3 2.5"',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD AGI AI238 512GB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
