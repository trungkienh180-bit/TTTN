const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const monitors = await prisma.sanPham.findMany({
    where: { danh_muc: { ten_danh_muc: { contains: 'Màn hình' } } }
  });

  for (let product of monitors) {
    if (!product.hinh_anh) continue;

    // Check if it's a TTGShop URL
    if (product.hinh_anh.includes('ttgshop.vn/media/product/')) {
      let baseUrl = product.hinh_anh;
      
      // If it ends with __X_.png or __X_.jpg, we can deduce the others
      let match = baseUrl.match(/(.*__)\d+(_\.(png|jpg|jpeg))/i);
      
      let img1, img2, img3, img4;
      
      if (match) {
        let prefix = match[1];
        let suffix = match[2];
        img1 = prefix + '1' + suffix;
        img2 = prefix + '2' + suffix;
        img3 = prefix + '3' + suffix;
        img4 = prefix + '4' + suffix;
      } else {
        // Maybe it's like _1.jpg, _2.jpg
        let match2 = baseUrl.match(/(.*_)\d+(\.(png|jpg|jpeg))/i);
        if (match2) {
          let prefix = match2[1];
          let suffix = match2[2];
          img1 = prefix + '1' + suffix;
          img2 = prefix + '2' + suffix;
          img3 = prefix + '3' + suffix;
          img4 = prefix + '4' + suffix;
        }
      }

      if (img1 && img2 && img3 && img4) {
        await prisma.sanPham.update({
          where: { id: product.id },
          data: {
            hinh_anh: img1,
            hinh_anh_1: img2,
            hinh_anh_2: img3,
            hinh_anh_3: img4
          }
        });
        console.log(`Updated images for ${product.ten_san_pham}`);
      }
    }
  }
}

main().finally(() => prisma.$disconnect());
