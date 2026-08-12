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
    buildItem('Thương hiệu', 'Samsung (Dòng: 990 PRO)'),
    buildItem('Dung lượng', '4TB'),
    buildItem('Chuẩn giao tiếp', 'PCIe NVMe 4.0 x4 (Kích cỡ: M.2 2280)'),
    buildItem('Loại chip nhớ', 'V-NAND 3-bit MLC'),
    buildItem('Tốc độ đọc / ghi', 'Lên đến 7450 MB/s / 6900 MB/s')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD Samsung 990 Pro 4TB PCIe NVMe 4.0x4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1054376845_69429_o_cung_ssd_samsung_990_pro_1tb_pcie_nvme_4__4__7c527825c2d84217b01fabc21c9eb154.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1054376845_69429_o_cung_ssd_samsung_990_pro_1tb_pcie_nvme_4__5__65763dbdadfa4e19960cdaa162aa8aeb.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1054376845_69429_o_cung_ssd_samsung_990_pro_1tb_pcie_nvme_4__2__b42c8b9e914e45dc87401c5b9119579e.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1054376845_69429_o_cung_ssd_samsung_990_pro_1tb_pcie_nvme_4__3__5a1a6aa9f7e74d8abd8a1c5f301141eb.jpg',
      gia_ban: 37999000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Samsung',
      o_cung: '4TB M.2 NVMe Gen4',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD Samsung 990 Pro 4TB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
