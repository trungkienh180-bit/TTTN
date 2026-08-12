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
    buildItem('Thương hiệu', 'HIKSEMI'),
    buildItem('Dung lượng', '256GB'),
    buildItem('Chuẩn giao tiếp', 'SATA III (6Gb/s)'),
    buildItem('Kích thước', '2.5 Inch'),
    buildItem('Tốc độ đọc (Tuần tự)', 'Lên đến 530 MB/s'),
    buildItem('Tốc độ ghi (Tuần tự)', 'Lên đến 400 MB/s'),
    buildItem('Tính năng nổi bật', 'Vỏ ngoài viền nhôm sơn tĩnh điện, độ bền cao')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD HIKSEMI HS-SSD-WAVE(S) 256G',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100732_o_cung_ssd_hiksemi_hs_ssd_wave_s_256g__2_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100732_o_cung_ssd_hiksemi_hs_ssd_wave_s_256g__3_.png',
      hinh_anh_2: null,
      hinh_anh_3: null,
      gia_ban: 1190000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'HIKSEMI',
      o_cung: '256GB SATA3',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD HIKSEMI HS-SSD-WAVE(S) 256G');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
