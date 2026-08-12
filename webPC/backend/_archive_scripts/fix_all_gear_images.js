const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const gears = await prisma.sanPham.findMany({
    where: { 
      OR: [
        { danh_muc: { ten_danh_muc: { contains: 'Gaming Gear' } } },
        { danh_muc: { ten_danh_muc: { contains: 'Tai nghe' } } },
        { danh_muc: { ten_danh_muc: { contains: 'Chuột' } } },
        { danh_muc: { ten_danh_muc: { contains: 'Bàn phím' } } }
      ]
    }
  });

  for (let product of gears) {
    if (!product.hinh_anh) continue;

    let baseUrl = product.hinh_anh;
    let img1, img2, img3, img4;

    // Pattern for tgdd URLs: 
    // e.g. ...-den-1-638620837125359414-750x500.jpg
    // or   ...-den-1-750x500.jpg
    let match = baseUrl.match(/(.*-)(\d+)((?:-\d+)?-750x500\.jpg|(?:-\d+)?\.jpg)/i);
    
    if (match) {
      let prefix = match[1]; // e.g. "...-den-"
      let suffix = match[3]; // e.g. "-6386...-750x500.jpg" or "-750x500.jpg"
      
      img1 = prefix + '1' + suffix;
      img2 = prefix + '2' + suffix;
      img3 = prefix + '3' + suffix;
      img4 = prefix + '4' + suffix;

      await prisma.sanPham.update({
        where: { id: product.id },
        data: {
          hinh_anh: img1,
          hinh_anh_1: img2,
          hinh_anh_2: img3,
          hinh_anh_3: img4
        }
      });
      console.log(`Updated TGDD images for ${product.ten_san_pham}`);
    } else {
        console.log(`Still unmatched: ${baseUrl}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
