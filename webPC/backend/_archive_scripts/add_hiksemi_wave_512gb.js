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
    buildItem('Thương hiệu', 'Hiksemi (Model: HS-SSD-WAVE(P))'),
    buildItem('Dung lượng', '512GB'),
    buildItem('Chuẩn kết nối', 'PCIe (M.2 2280)'),
    buildItem('Loại chip nhớ', '3D-TLC'),
    buildItem('Tốc độ đọc / ghi', '2500 MB/s / 1025 MB/s'),
    buildItem('Tuổi thọ (MTBF)', '1.500.000 giờ'),
    buildItem('Nhiệt độ hoạt động', '0 - 70°C (Cân nặng: ≤7g)')
  ];

  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Ổ Cứng SSD HIKSEMI WAVE 512GB (HS-SSD-WAVE(P) 512G)',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1072100500_o_cung_ssd_hiksemi_wave_512gb_m_2_2280_pcie_gen3_x4__3_.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100500_o_cung_ssd_hiksemi_wave_512gb_m_2_2280_pcie_gen3_x4__5_.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100500_o_cung_ssd_hiksemi_wave_512gb_m_2_2280_pcie_gen3_x4__4_.jpg',
      hinh_anh_3: null,
      gia_ban: 2390000,
      so_luong: 10,
      mo_ta: buildList(items),
      hang_san_xuat: 'Hiksemi',
      o_cung: '512GB M.2 PCIe',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm: SSD HIKSEMI WAVE 512GB');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
