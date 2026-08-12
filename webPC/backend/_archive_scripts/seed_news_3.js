const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const images = [
    'https://ttgshop.vn/media/product/1072100725_man_hinh_gaming_lg_ultragear_39gx90sa_w__5_.png', // Wide LG
    'https://ttgshop.vn/media/product/1072100742_man_hinh_gaming_asus_rog_strix_oled_xg32ucwmg__5_.png', // Wide Asus
    'https://ttgshop.vn/media/product/1072100739_man_hinh_asus_rog_swift_oled_pg27aqwp_g_edition_20__6_.png', // Wide Asus 2
    'https://ttgshop.vn/media/product/1072100725_man_hinh_gaming_lg_ultragear_39gx90sa_w__1_.png', // Wide LG 2
    'https://ttgshop.vn/media/product/1072100712_man_hinh_may_tinh_viox_mf2425_v1__1_.png', // Wide Viox
    'https://ttgshop.vn/media/product/1072100742_man_hinh_gaming_asus_rog_strix_oled_xg32ucwmg__4_.png', // Wide Asus 3
    'https://ttgshop.vn/media/product/1072100739_man_hinh_asus_rog_swift_oled_pg27aqwp_g_edition_20__4_.png' // Wide Asus 4
  ];

  const newsData = [
    {
      tieu_de: 'Bùng nổ màn hình cong 2026: Trải nghiệm Gaming đắm chìm',
      hinh_anh: images[0],
      noi_dung: '<p>Năm 2026 đánh dấu bước ngoặt lớn của ngành công nghiệp màn hình với sự xuất hiện ồ ạt của các dòng màn hình cong tần số quét siêu cao. Xu hướng này hứa hẹn thay đổi hoàn toàn cách chúng ta giải trí.</p><p>Tại TTGKShop, chúng tôi đã cập nhật sẵn sàng các dòng sản phẩm mới nhất với mức giá cực kỳ ưu đãi để phục vụ nhu cầu tiên phong công nghệ của khách hàng.</p>'
    },
    {
      tieu_de: `[Khuyến Mãi Khủng] Giảm giá sốc cho siêu phẩm Màn hình OLED`,
      hinh_anh: images[1],
      noi_dung: `<p>Cơ hội vàng không thể bỏ lỡ trong tháng này! Siêu phẩm <strong>Màn hình OLED 240Hz</strong> đang được giảm giá cực sốc tại TTGKShop.</p><p>Với cấu hình mạnh mẽ, hiệu năng vượt trội, đây là màn hình hoàn hảo cho cả game thủ lẫn nhà sáng tạo nội dung. Số lượng có hạn, nhanh tay chốt đơn ngay hôm nay để nhận thêm nhiều phần quà hấp dẫn!</p>`
    },
    {
      tieu_de: 'Bão sale sập sàn: Màn hình LG UltraGear giảm giá tới 30%',
      hinh_anh: images[2],
      noi_dung: '<p>Chương trình tri ân khách hàng lớn nhất năm 2026 mang đến mức giá không tưởng cho các dòng màn hình đồ họa LG. Nếu bạn đang muốn nâng cấp dàn PC của mình, đừng bỏ lỡ đợt sale xả kho có một không hai này!</p>'
    },
    {
      tieu_de: `Top màn hình OLED đáng mua nhất: Trải nghiệm thị giác đỉnh cao`,
      hinh_anh: images[3],
      noi_dung: `<p>Màn hình OLED đang là xu hướng không thể chối cãi của năm 2026. Với màu đen sâu thẳm, tốc độ phản hồi tính bằng micro-giây và độ tương phản vô cực, màn hình này mang đến trải nghiệm hình ảnh tuyệt mỹ nhất.</p><p>Ghé thăm danh mục Màn Hình của chúng tôi để sắm ngay một "em" về nâng cấp góc giải trí của bạn.</p>`
    },
    {
      tieu_de: 'Bảng giá màn hình Gaming tháng này: Siêu sale cho sinh viên',
      hinh_anh: images[4],
      noi_dung: '<p>Mua sắm cực hời cho học sinh sinh viên chuẩn bị bước vào năm học mới. TTGKShop tung ra chương trình đồng giá và trợ giá hàng loạt mẫu màn hình cực HOT, mang lại sự mượt mà không lo giật lag khi leo rank.</p><p>Liên hệ ngay để nhận voucher ưu đãi lên đến 1 triệu đồng.</p>'
    },
    {
      tieu_de: '[Góc Khuyến Mãi] Nâng cấp màn hình xịn, tặng kèm Gear cực ngầu',
      hinh_anh: images[5],
      noi_dung: '<p>Sắm màn hình chơi game ngay hôm nay không chỉ được giảm giá mà còn được tặng kèm phím chuột cơ siêu chất lượng. Chương trình giới hạn áp dụng cho các dòng sản phẩm cao cấp, giúp bạn có được góc máy hoàn hảo nhất.</p><p>Đến ngay showroom TTGKShop để trải nghiệm trực tiếp!</p>'
    },
    {
      tieu_de: `Đánh giá nhanh: Màn hình ASUS ROG có đáng tiền?`,
      hinh_anh: images[6],
      noi_dung: `<p>Hôm nay chúng ta sẽ cùng đập hộp và đánh giá nhanh siêu phẩm <strong>Màn hình ASUS ROG OLED</strong>. Liệu hiệu năng thực tế có đúng như lời đồn? Góc nhìn và màu sắc ra sao?</p><p>Sản phẩm hiện đang được bán tại TTGKShop với chính sách bảo hành chính hãng lỗi 1 đổi 1 cực kỳ an tâm. Cùng tìm hiểu chi tiết trong bài viết này nhé!</p>`
    }
  ];

  console.log("Updating news articles with original database images...");
  
  await prisma.tinTuc.deleteMany({});
  
  for (const news of newsData) {
    await prisma.tinTuc.create({
      data: news
    });
  }

  console.log(`Successfully created ${newsData.length} news articles.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
