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
    buildItem('Thương hiệu', 'Kioxia (Model: Exceria Basic 1TB)'),
    buildItem('Dung lượng', '1TB'),
    buildItem('Chuẩn kết nối', 'PCIe Gen 4.0 x4 NVMe'),
    buildItem('Kích thước', 'M.2 2280'),
    buildItem('Tốc độ đọc / ghi', 'Lên đến 7200 MB/s / 6600 MB/s'),
    buildItem('Đọc / Ghi ngẫu nhiên', '1.000.000 IOPS / 1.150.000 IOPS'),
    buildItem('Loại bộ nhớ', 'BiCS FLASH QLC'),
    buildItem('Độ bền (TBW)', '300 TB'),
    buildItem('Bảo hành', '60 tháng hoặc giới hạn TBW')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ CỨNG NVME KIOXIA EXCERIA BASIC 1TB GEN 4X4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100545_o_cung_nvme_kioxia_exceria_basic_1tb_gen_4x4__1_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100545_o_cung_nvme_kioxia_exceria_basic_1tb_gen_4x4__3_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100545_o_cung_nvme_kioxia_exceria_basic_1tb_gen_4x4__2_.png',
      hinh_anh_3: null,
      gia_ban: 5390000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Kioxia',
      o_cung: '1TB M.2 NVMe Gen4',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: NVME KIOXIA EXCERIA BASIC 1TB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
