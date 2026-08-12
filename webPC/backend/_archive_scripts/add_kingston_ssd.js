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
    buildItem('Thương hiệu', 'Kingston (Model: SNV3S/1000G)'),
    buildItem('Dung lượng', '1TB'),
    buildItem('Chuẩn giao tiếp', 'PCIe Gen 4.0 x4 NVMe (M.2 2280)'),
    buildItem('Loại chip nhớ', '3D NAND (Hỗ trợ HMB)'),
    buildItem('Tốc độ đọc / ghi', '6000 MB/s / 4000 MB/s'),
    buildItem('Độ bền (TBW)', '320 TB'),
    buildItem('Bảo hành', '60 tháng hoặc trong giới hạn TBW')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD Kingston NV3 1TB PCIe 4.0 x4 M.2 NVMe',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1071463257_12948_ssd_kingston_nv3_1tb_m_2_pcie_ge_db07930d4bc0474d9b12c235e7b787c6.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1071463257_12948_49508_nv3_1000gb_a_hr_c76c8f582df64b4987d85a3a608cb370.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1071463257_12948_49508_nv3_1000gb_s_hr_3bebd34ce7fc426bb6ef4c528856f9ae.jpg',
      hinh_anh_3: null,
      gia_ban: 4590000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Kingston',
      o_cung: '1TB M.2 NVMe Gen4',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD Kingston NV3 1TB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
