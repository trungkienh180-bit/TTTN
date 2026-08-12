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
    buildItem('Thương hiệu', 'ADATA (Dòng: LEGEND 710)'),
    buildItem('Dung lượng', '512GB'),
    buildItem('Chuẩn giao tiếp', 'PCIe Gen3 x4 (M.2 2280)'),
    buildItem('Loại chip nhớ', '3D NAND'),
    buildItem('Tốc độ đọc / ghi', 'Lên đến 2400 MB/s / 1800 MB/s'),
    buildItem('Độ bền (TBW)', '260 TB'),
    buildItem('Tuổi thọ (MTBF)', '1.500.000 giờ')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ cứng SSD ADATA LEGEND 710 512GB PCIe Gen3x4',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100237_43774_710_2.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100237_43774_710_1.png',
      hinh_anh_2: null,
      hinh_anh_3: null,
      gia_ban: 2390000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'ADATA',
      o_cung: '512GB M.2 PCIe Gen3',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD ADATA LEGEND 710 512GB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
