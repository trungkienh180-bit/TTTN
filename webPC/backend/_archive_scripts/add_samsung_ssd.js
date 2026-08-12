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
    buildItem('Thương hiệu', 'Samsung'),
    buildItem('Dung lượng', '1TB'),
    buildItem('Loại ổ cứng', 'M.2 NVMe'),
    buildItem('Chuẩn giao tiếp', 'PCIe Gen 5.0 x4'),
    buildItem('Kích thước', 'M.2 2280')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD Samsung 9100 PRO 1TB M.2 NVMe PCIe Gen5.0 x4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100582_o_cung_ssd_samsung_9100_pro_1tb_m_2_nvme__3_.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100582_o_cung_ssd_samsung_9100_pro_1tb_m_2_nvme__2_.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100582_o_cung_ssd_samsung_9100_pro_1tb_m_2_nvme__1_.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100582_o_cung_ssd_samsung_9100_pro_1tb_m_2_nvme__6_.png',
      gia_ban: 9790000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Samsung',
      o_cung: '1TB M.2 NVMe Gen5',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD Samsung 9100 PRO 1TB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
