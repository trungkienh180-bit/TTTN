const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.tinTuc.deleteMany({});
  
  // Lấy các sản phẩm thuộc các danh mục khác nhau
  const pcGaming = await prisma.sanPham.findFirst({ where: { danh_muc_id: 1 } }) || await prisma.sanPham.findFirst();
  const pcWorkstation = await prisma.sanPham.findFirst({ where: { danh_muc_id: 2 } }) || await prisma.sanPham.findFirst();
  const pcVanPhong = await prisma.sanPham.findFirst({ where: { danh_muc_id: 3 } }) || await prisma.sanPham.findFirst();
  const manHinh = await prisma.sanPham.findFirst({ where: { danh_muc_id: 4 } }) || await prisma.sanPham.findFirst();
  const linhKien = await prisma.sanPham.findFirst({ where: { danh_muc_id: 5 } }) || await prisma.sanPham.findFirst();
  const gamingGear = await prisma.sanPham.findFirst({ where: { danh_muc_id: 6 } }) || await prisma.sanPham.findFirst();
  const tanNhiet = await prisma.sanPham.findFirst({ where: { danh_muc_id: 7 } }) || await prisma.sanPham.findFirst();
  
  const newsData = [
    {
      tieu_de: `Đánh giá siêu phẩm Đồ Họa 3D: ${pcWorkstation.ten_san_pham}`,
      hinh_anh: pcWorkstation.hinh_anh,
      noi_dung: `<p>Dành riêng cho dân thiết kế đồ họa chuyên nghiệp, <strong>${pcWorkstation.ten_san_pham}</strong> sở hữu sức mạnh kinh hoàng với cấu hình khủng.</p><p>Render Video 4K, dựng hình 3D giờ đây chỉ là chuyện nhỏ.</p>`,
      san_pham_id: pcWorkstation.id
    },
    {
      tieu_de: `Review Cỗ máy Chiến Game Bất Bại: ${pcGaming.ten_san_pham}`,
      hinh_anh: pcGaming.hinh_anh,
      noi_dung: `<p>Được trang bị Card đồ họa mới nhất, <strong>${pcGaming.ten_san_pham}</strong> cân mượt mà mọi tựa game AAA ở thiết lập Max Setting.</p><p>Anh em game thủ tuyệt đối không thể bỏ qua!</p>`,
      san_pham_id: pcGaming.id
    },
    {
      tieu_de: `Góc Khuyến Mãi: Giảm sốc ${manHinh.ten_san_pham} cho Sinh Viên`,
      hinh_anh: manHinh.hinh_anh,
      noi_dung: `<p>Chào đón năm học mới, TTGKShop tung deal cực sốc cho dòng màn hình <strong>${manHinh.ten_san_pham}</strong>.</p><p>Tần số quét cao, màu sắc trung thực, giá siêu hời.</p>`,
      san_pham_id: manHinh.id
    },
    {
      tieu_de: `Tại sao dân văn phòng nên chọn ${pcVanPhong.ten_san_pham}?`,
      hinh_anh: pcVanPhong.hinh_anh,
      noi_dung: `<p>Thiết kế nhỏ gọn, tinh tế nhưng hiệu năng đủ sức đáp ứng mọi tác vụ văn phòng, <strong>${pcVanPhong.ten_san_pham}</strong> chính là trợ thủ đắc lực của bạn.</p>`,
      san_pham_id: pcVanPhong.id
    },
    {
      tieu_de: `Trải nghiệm gõ phím cực đỉnh cùng ${gamingGear.ten_san_pham}`,
      hinh_anh: gamingGear.hinh_anh,
      noi_dung: `<p>Sản phẩm Gaming Gear <strong>${gamingGear.ten_san_pham}</strong> mang lại cảm giác phản hồi phím tuyệt vời và hệ thống LED RGB cực chất.</p>`,
      san_pham_id: gamingGear.id
    },
    {
      tieu_de: `Nâng cấp tản nhiệt siêu tốc: Lựa chọn ${tanNhiet.ten_san_pham}`,
      hinh_anh: tanNhiet.hinh_anh,
      noi_dung: `<p>PC của bạn đang quá nhiệt khi chơi game? Đừng lo, <strong>${tanNhiet.ten_san_pham}</strong> sẽ giải quyết bài toán nhiệt độ một cách êm ái nhất.</p>`,
      san_pham_id: tanNhiet.id
    },
    {
      tieu_de: `Linh kiện nâng cấp đáng tiền: ${linhKien.ten_san_pham}`,
      hinh_anh: linhKien.hinh_anh,
      noi_dung: `<p>Nếu bạn đang muốn nâng cấp bộ PC cũ, thì <strong>${linhKien.ten_san_pham}</strong> là một trong những món linh kiện nên đầu tư nhất trong năm nay.</p>`,
      san_pham_id: linhKien.id
    }
  ];

  for (const item of newsData) {
    await prisma.tinTuc.create({ data: item });
  }

  console.log("Seeded 7 diverse news items linked to products.");
}

main().finally(() => prisma.$disconnect());
