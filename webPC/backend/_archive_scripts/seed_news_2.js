const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const images = [
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const newsData = [
    {
      tieu_de: 'Bùng nổ công nghệ PC năm 2026: AI PC lên ngôi, định hình lại tương lai',
      hinh_anh: images[0],
      noi_dung: '<p>Năm 2026 đánh dấu bước ngoặt lớn của ngành công nghiệp PC với sự xuất hiện ồ ạt của các dòng máy AI PC. Các bộ vi xử lý mới tích hợp NPU siêu mạnh giúp xử lý các tác vụ trí tuệ nhân tạo ngay trên máy (On-device AI) mà không cần phụ thuộc vào đám mây. Xu hướng này hứa hẹn thay đổi hoàn toàn cách chúng ta làm việc và giải trí.</p><p>Tại TTGKShop, chúng tôi đã cập nhật sẵn sàng các dòng AI PC mới nhất với mức giá cực kỳ ưu đãi để phục vụ nhu cầu tiên phong công nghệ của khách hàng.</p>'
    },
    {
      tieu_de: `[Khuyến Mãi Khủng] Giảm giá sốc cho siêu phẩm PC Gaming`,
      hinh_anh: images[1],
      noi_dung: `<p>Cơ hội vàng không thể bỏ lỡ trong tháng này! Siêu phẩm <strong>PC Gaming 2026</strong> đang được giảm giá cực sốc tại TTGKShop.</p><p>Với cấu hình mạnh mẽ, hiệu năng vượt trội, đây là cỗ máy hoàn hảo cho cả game thủ lẫn nhà sáng tạo nội dung. Số lượng có hạn, nhanh tay chốt đơn ngay hôm nay để nhận thêm nhiều phần quà hấp dẫn!</p>`
    },
    {
      tieu_de: 'Card đồ họa RTX 5000 Series: Sức mạnh vượt giới hạn cho Game thủ 2026',
      hinh_anh: images[2],
      noi_dung: '<p>Thế hệ card đồ họa RTX 5000 Series đã chính thức làm mưa làm gió trong năm 2026 với kiến trúc hoàn toàn mới, mang lại hiệu năng Ray Tracing và DLSS 4.0 mượt mà đến khó tin.</p><p>Bạn đang muốn nâng cấp dàn PC của mình? Đừng bỏ lỡ các mẫu card màn hình RTX đỉnh cao đang có sẵn trên kệ của TTGKShop với giá cực hời!</p>'
    },
    {
      tieu_de: `Top màn hình OLED đáng mua nhất: Trải nghiệm thị giác đỉnh cao`,
      hinh_anh: images[3],
      noi_dung: `<p>Màn hình OLED đang là xu hướng không thể chối cãi của năm 2026. Với màu đen sâu thẳm, tốc độ phản hồi tính bằng micro-giây và độ tương phản vô cực, màn hình này mang đến trải nghiệm hình ảnh tuyệt mỹ nhất.</p><p>Ghé thăm danh mục Màn Hình của chúng tôi để sắm ngay một "em" về nâng cấp góc giải trí của bạn.</p>`
    },
    {
      tieu_de: 'DDR6 và PCIe Gen 6: Cuộc cách mạng tốc độ mới bắt đầu',
      hinh_anh: images[4],
      noi_dung: '<p>Năm 2026 chứng kiến sự ra mắt thương mại của RAM DDR6 và chuẩn kết nối PCIe Gen 6, nâng tốc độ truyền tải dữ liệu lên một tầm cao mới. Các game thủ và editor sẽ không còn phải lo lắng về độ trễ khi xử lý các file 8K hay render 3D nặng.</p><p>Các bo mạch chủ hỗ trợ công nghệ mới nhất này đã bắt đầu cập bến TTGKShop. Liên hệ ngay để được tư vấn build PC đón đầu công nghệ.</p>'
    },
    {
      tieu_de: 'Xu hướng thiết kế PC Bể cá trong năm 2026: Đẹp, Độc, Lạ',
      hinh_anh: images[5],
      noi_dung: '<p>Case PC phong cách "Bể cá" (kính cường lực tràn viền) tiếp tục thống trị thị trường năm 2026. Khoe trọn vẻ đẹp của linh kiện bên trong cùng hệ thống tản nhiệt nước AIO lung linh, đây là lựa chọn hàng đầu của những người yêu cái đẹp.</p><p>Dịch vụ build PC tại TTGKShop với bộ sưu tập case bể cá đa dạng chắc chắn sẽ làm bạn hài lòng.</p>'
    },
    {
      tieu_de: `Đánh giá nhanh: Bàn phím cơ Custom xu hướng mới`,
      hinh_anh: images[6],
      noi_dung: `<p>Hôm nay chúng ta sẽ cùng đập hộp và đánh giá nhanh siêu phẩm <strong>Bàn phím cơ Custom 2026</strong>. Liệu cảm giác gõ thực tế có đúng như lời đồn? Switch có mượt mà?</p><p>Sản phẩm hiện đang được bán tại TTGKShop với chính sách bảo hành chính hãng lỗi 1 đổi 1 cực kỳ an tâm. Cùng tìm hiểu chi tiết trong bài viết này nhé!</p>`
    }
  ];

  console.log("Updating news articles with beautiful images...");
  
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
