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
    let img2, img3, img4;

    // Use a strict regex to correctly identify the index number, completely avoiding timestamps.
    let match = baseUrl.match(/^(.*?-)(\d+)((?:-\d{10,})?(?:-750x500)?\.(?:jpg|png|jpeg))$/i);
    
    if (match) {
      let prefix = match[1]; 
      let num = parseInt(match[2]);
      let suffix = match[3]; 
      
      let next1 = num === 1 ? 2 : 1;
      let next2 = num === 1 ? 3 : 2;
      let next3 = num === 1 ? 4 : (num === 2 ? 4 : 3);
      if(num !== 1 && num !== 2) {
          next2 = next1 + 1;
          if (next2 === num) next2++;
          next3 = next2 + 1;
          if (next3 === num) next3++;
      }

      img2 = prefix + next1 + suffix;
      img3 = prefix + next2 + suffix;
      img4 = prefix + next3 + suffix;
    } else {
      let match2 = baseUrl.match(/^(.*_)(\d+)((?:-\d{10,})?(?:-750x500)?\.(?:jpg|png|jpeg))$/i);
      if (match2) {
          let prefix = match2[1]; 
          let num = parseInt(match2[2]);
          let suffix = match2[3]; 
          img2 = prefix + (num === 1 ? 2 : 1) + suffix;
          img3 = prefix + (num === 1 ? 3 : (num===2 ? 3 : 2)) + suffix;
          img4 = prefix + (num === 1 ? 4 : (num===2 ? 4 : 3)) + suffix;
      }
    }

    if (img2 && img3 && img4) {
      await prisma.sanPham.update({
        where: { id: product.id },
        data: {
          // Keep the original working hinh_anh
          hinh_anh_1: img2,
          hinh_anh_2: img3,
          hinh_anh_3: img4
        }
      });
      console.log(`Perfectly deduced extra images for ${product.ten_san_pham}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
