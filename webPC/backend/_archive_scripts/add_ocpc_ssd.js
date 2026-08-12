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
    buildItem('Thương hiệu', 'OCPC (Model: MFL-300)'),
    buildItem('Dung lượng', '512GB'),
    buildItem('Chuẩn giao tiếp', 'NVMe PCIe Gen 3x4'),
    buildItem('Kích thước', 'M.2 2280'),
    buildItem('Tốc độ đọc / ghi', '2100 MB/s / 3100 MB/s')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD OCPC MFL-300 512GB NVMe Gen 3x4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1062249206_ssd_ocpc_nvme_512g_gen_3x4_pcm_1_71136ac6041b48ec8c127e8dddb4695e.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1062249206_ssd_ocpc_nvme_512g_gen_3x4_pcm_2_771ab0ffae3240b684cf2489da8d3a72.png',
      hinh_anh_2: null,
      hinh_anh_3: null,
      gia_ban: 2390000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'OCPC',
      o_cung: '512GB M.2 NVMe Gen3',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD OCPC MFL-300 512GB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
