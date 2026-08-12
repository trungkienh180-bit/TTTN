const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const mo_ta_html = `
    <h3>Thông số kỹ thuật:</h3>
    <ul>
      <li><strong>Model:</strong> DUAL-RTX5060TI-O16G-WHITE</li>
      <li><strong>GPU:</strong> NVIDIA GeForce RTX 5060 Ti</li>
      <li><strong>AI Performance:</strong> 759 TOPs</li>
      <li><strong>Bộ nhớ:</strong> 16GB GDDR7</li>
      <li><strong>Tốc độ bộ nhớ:</strong> 28 Gbps</li>
      <li><strong>Giao diện bộ nhớ:</strong> 128-bit</li>
      <li><strong>CUDA Cores:</strong> 4608</li>
      <li><strong>Xung nhịp:</strong> OC mode: 2632 MHz, Default mode: 2602 MHz</li>
      <li><strong>Chuẩn Bus:</strong> PCI Express 5.0</li>
      <li><strong>OpenGL:</strong> 4.6</li>
      <li><strong>Độ phân giải tối đa:</strong> 7680 × 4320</li>
      <li><strong>Cổng kết nối:</strong> 1× HDMI 2.1b, 3× DisplayPort 2.1b</li>
      <li><strong>Hỗ trợ HDCP:</strong> 2.3</li>
      <li><strong>Số màn hình hỗ trợ:</strong> 4</li>
      <li><strong>Kích thước:</strong> 229 × 120 × 50 mm</li>
      <li><strong>Đầu cấp nguồn:</strong> 1× 8-pin</li>
      <li><strong>Khe cắm:</strong> 2.5 Slot</li>
      <li><strong>PSU khuyến nghị:</strong> 550W</li>
      <li><strong>Phần mềm:</strong> ASUS GPU Tweak III, MuseTree, GeForce Game Ready Driver, Studio Driver</li>
    </ul>
  `;

  const sanPham = await prisma.sanPham.create({
    data: {
      ten_san_pham: 'ASUS Dual GeForce RTX 5060 Ti 16GB GDDR7 White OC Edition',
      danh_muc_id: 5, // Linh Kiện Máy Tính
      hinh_anh: 'https://ttgshop.vn/media/product/1072100716_card_man_hinh_asus_dual_geforce_rtx_5060_ti_white_pcm_1.png',
      hinh_anh_1: 'https://ttgshop.vn/media/product/1072100716_card_man_hinh_asus_dual_geforce_rtx_5060_ti_white_pcm_2.png',
      hinh_anh_2: 'https://ttgshop.vn/media/product/1072100716_card_man_hinh_asus_dual_geforce_rtx_5060_ti_white_pcm_3.png',
      hinh_anh_3: 'https://ttgshop.vn/media/product/1072100716_card_man_hinh_asus_dual_geforce_rtx_5060_ti_white_pcm_4.png',
      gia_ban: 12500000,
      so_luong: 10,
      mo_ta: mo_ta_html,
      hang_san_xuat: 'ASUS',
      vga: 'RTX 5060 Ti 16GB', // Lưu thêm thông tin đặc trưng của linh kiện này
      la_moi: true
    }
  });

  console.log('Thêm thành công sản phẩm:', sanPham.ten_san_pham);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
