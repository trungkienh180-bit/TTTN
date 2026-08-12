const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function buildItem(label, value) {
  if (!value) return '';
  return `<li class="flex items-start gap-2">
    <div class="mt-1 min-w-4 text-[#00a896] font-bold">✔</div>
    <span><strong class="font-semibold text-gray-800">${label}:</strong> ${value}</span>
  </li>`;
}

function buildList(items) {
  return `<ul class="text-sm text-gray-700 space-y-2.5">
    ${items.join('')}
  </ul>`;
}

async function main() {
  // 1. ZOTAC
  const zotacItems = [
    buildItem('Sản phẩm', 'VGA - Card màn hình'),
    buildItem('Model', 'ZOTAC GAMING GeForce RTX 3060 Twin Edge'),
    buildItem('Xung nhịp GPU', 'Boost: 1807 MHz'),
    buildItem('Nhân CUDA', '3584'),
    buildItem('Bộ nhớ', '12 GB GDDR6 (192-bit, 15000 MHz)'),
    buildItem('Chuẩn Bus', 'PCI Express 4.0 x 16'),
    buildItem('Cổng kết nối', '3 x DisplayPort 1.4a, HDMI 2.1'),
    buildItem('Đa màn hình', '4'),
    buildItem('Đầu nối nguồn', '1 × 8-pin'),
    buildItem('Kích thước', '224.1mm x 116.3mm x 39.2mm')
  ];
  
  await prisma.sanPham.create({
    data: {
      ten_san_pham: 'Card Màn Hình ZOTAC GAMING GeForce RTX 3060 12GB Twin Edge',
      danh_muc_id: 5,
      hinh_anh: 'https://ttgshop.vn/media/product/1071760709_vga_zotac_gaming_geforce_rtx_3060_twin_edge_oc_1_afff6c5928f549419c37d121ff64260b.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1071760709_11067_vga_zotac_gaming_geforce_rtx_3060_twin_edge_oc_3_cd741978874e4ff0b1be2a1cce5e7bde.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1071760709_11067_vga_zotac_gaming_geforce_rtx_3060_twin_edge_oc_5_0ecd50af55ee488a90e79ca179618ac3.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1071760709_11067_vga_zotac_gaming_geforce_rtx_3060_twin_edge_oc_6_aa241109cfd64e0f896c3e2f805ddf4d.jpg',
      gia_ban: 9900000,
      so_luong: 10,
      mo_ta: buildList(zotacItems),
      hang_san_xuat: 'ZOTAC',
      vga: 'RTX 3060 12GB',
      la_moi: true
    }
  });

  // 2. ASUS
  const asusItems = [
    buildItem('Model', 'DUAL-RTX5060TI-O16G-WHITE'),
    buildItem('GPU', 'NVIDIA GeForce RTX 5060 Ti'),
    buildItem('AI Performance', '759 TOPs'),
    buildItem('Bộ nhớ', '16GB GDDR7 (128-bit, 28 Gbps)'),
    buildItem('CUDA Cores', '4608'),
    buildItem('Xung nhịp', 'OC mode: 2632 MHz, Default mode: 2602 MHz'),
    buildItem('Chuẩn Bus', 'PCI Express 5.0'),
    buildItem('Cổng kết nối', '1× HDMI 2.1b, 3× DisplayPort 2.1b'),
    buildItem('Đầu cấp nguồn', '1× 8-pin'),
    buildItem('Kích thước', '229 × 120 × 50 mm')
  ];
  const asusDesc = buildList(asusItems);
  const asus = await prisma.sanPham.findFirst({ where: { ten_san_pham: { contains: 'ASUS Dual GeForce RTX 5060 Ti' } } });
  if (asus) await prisma.sanPham.update({ where: { id: asus.id }, data: { mo_ta: asusDesc } });

  // 3. COLORFUL
  const colorItems = [
    buildItem('Sản phẩm', 'Card màn hình - VGA'),
    buildItem('Hãng sản xuất', 'Colorful'),
    buildItem('Engine đồ họa', 'GeForce® RTX 3060'),
    buildItem('Bộ nhớ', '12GB GDDR6 (192 bit, 15Gbps)'),
    buildItem('Engine Clock', 'Base: 1320Mhz; Boost: 1777Mhz'),
    buildItem('Lõi CUDA', '3584'),
    buildItem('Kết nối', '3DP+HDMI'),
    buildItem('Power Connectors', '8pin'),
    buildItem('Kích thước', '310×131.5×56mm')
  ];
  const colorDesc = buildList(colorItems);
  const colorful = await prisma.sanPham.findFirst({ where: { ten_san_pham: { contains: 'COLORFUL RTX 3060 NB' } } });
  if (colorful) await prisma.sanPham.update({ where: { id: colorful.id }, data: { mo_ta: colorDesc } });

  console.log('Thêm ZOTAC và format lại 3 card thành công!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
