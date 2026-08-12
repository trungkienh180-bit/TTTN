const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const mo_ta_html = `
    <h3>Thông số kỹ thuật:</h3>
    <ul>
      <li><strong>Sản phẩm:</strong> Card màn hình - VGA</li>
      <li><strong>Hãng sản xuất:</strong> Colorful</li>
      <li><strong>Engine đồ họa:</strong> GeForce® RTX 3060</li>
      <li><strong>Bộ nhớ:</strong> 12GB GDDR6</li>
      <li><strong>Engine Clock:</strong> Base: 1320Mhz; Boost: 1777Mhz</li>
      <li><strong>Lõi CUDA:</strong> 3584</li>
      <li><strong>Clock bộ nhớ:</strong> 15Gbps</li>
      <li><strong>Giao diện bộ nhớ:</strong> 192 bit</li>
      <li><strong>Kết nối:</strong> 3DP+HDMI</li>
      <li><strong>Kích thước:</strong> 310×131.5×56mm / 253.4×132.5×41.3mm</li>
      <li><strong>PSU đề nghị:</strong> 550W trở lên</li>
      <li><strong>Power Connectors:</strong> 8pin</li>
      <li><strong>DirectX:</strong> DirectX 12 Ultimate/OpenGL 4.6</li>
    </ul>
  `;

  const sanPham = await prisma.sanPham.create({
    data: {
      ten_san_pham: 'CARD MÀN HÌNH COLORFUL RTX 3060 NB DUO 12G V3 L-V',
      danh_muc_id: 5, // Linh Kiện Máy Tính
      hinh_anh: 'https://ttgshop.vn/media/product/1072100205_11104_card_man_hinh_colorful_rtx_3060_nb_duo_12g_v3_l_v_1.jpg',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100205_11104_card_man_hinh_colorful_rtx_3060_nb_duo_12g_v3_l_v_2.jpg',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100205_11104_card_man_hinh_colorful_rtx_3060_nb_duo_12g_v3_l_v_3.jpg',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100205_11104_card_man_hinh_colorful_rtx_3060_nb_duo_12g_v3_l_v_4.jpg',
      gia_ban: 7500000,
      so_luong: 10,
      mo_ta: mo_ta_html,
      hang_san_xuat: 'Colorful',
      vga: 'RTX 3060 12GB',
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm:', sanPham.ten_san_pham);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
