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
    buildItem('Thương hiệu', 'Kioxia (Model: Exceria Plus G4)'),
    buildItem('Dung lượng', '1TB'),
    buildItem('Chuẩn giao tiếp', 'M.2 PCIe Gen5 x4 (NVMe)'),
    buildItem('Kích thước', 'M.2 2280'),
    buildItem('Tốc độ đọc / ghi', '10.000 MB/s / 7.900 MB/s'),
    buildItem('Đọc / Ghi ngẫu nhiên', '1.300.000 IOPS / 1.400.000 IOPS'),
    buildItem('Loại bộ nhớ', 'BiCS FLASH™ TLC'),
    buildItem('Độ bền (TBW / MTTF)', '600 TB / 1.5 triệu giờ')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD Kioxia Exceria Plus G4 1TB M.2 PCIe Gen5 x4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100636_ssd_1tb_kioxia_exceria_plus_g4_pcle_5_0_m_2_2280__5_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100636_ssd_1tb_kioxia_exceria_plus_g4_pcle_5_0_m_2_2280__1_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100636_ssd_1tb_kioxia_exceria_plus_g4_pcle_5_0_m_2_2280__4_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100636_ssd_1tb_kioxia_exceria_plus_g4_pcle_5_0_m_2_2280__3_.png',
      gia_ban: 5990000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Kioxia',
      o_cung: '1TB M.2 PCIe 5.0',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD Kioxia Exceria Plus G4 1TB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
