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
    buildItem('Thương hiệu', 'ADATA (Dòng: LEGEND 860)'),
    buildItem('Dung lượng', '2TB'),
    buildItem('Chuẩn giao tiếp', 'PCIe Gen4 x4 NVMe (M.2 2280)'),
    buildItem('Loại chip nhớ', '3D NAND'),
    buildItem('Tốc độ đọc / ghi', '6000 MB/s / 5000 MB/s'),
    buildItem('Tính năng nổi bật', 'Hỗ trợ nâng cấp cho PS5'),
    buildItem('Bảo hành', '60 tháng')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD ADATA LEGEND 860 2TB NVMe PCIe Gen4 x4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1071755416_o_cung_ssd_adata_legend_860_2tb_7_03bad810ab2a45a0aaf6f96a876dc517.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1071755416_o_cung_ssd_adata_legend_860_2tb_1_133c6b7c31f247db81d96d67d8c12d80.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1071755416_o_cung_ssd_adata_legend_860_2tb_2_ba38a9d8789145fdaa801e74f7afb840.jpg',
      hinh_anh_3: null,
      gia_ban: 5690000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ADATA',
      o_cung: '2TB M.2 NVMe Gen4',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD ADATA LEGEND 860 2TB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
