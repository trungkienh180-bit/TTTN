const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const http = require('http');
const https = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(url, { method: 'HEAD', timeout: 3000 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

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
    
    // Determine the base pattern
    // e.g. ...-den-3-638620837125359414-750x500.jpg -> prefix: ...-den-, suffix: -6386...
    let match = baseUrl.match(/(.*-)(\d+)((?:-\d+)?(?:-750x500)?\.(?:png|jpg|jpeg))/i);
    let candidates = [];
    
    if (match) {
      let prefix = match[1];
      let currentNum = parseInt(match[2]);
      let suffix = match[3];
      
      for (let i = 1; i <= 5; i++) {
        if (i !== currentNum) {
          candidates.push(prefix + i + suffix);
        }
      }
    } else {
      // try without dash: e.g. _1.jpg
      let match2 = baseUrl.match(/(.*_)(\d+)((?:-\d+)?(?:-750x500)?\.(?:png|jpg|jpeg))/i);
      if (match2) {
        let prefix = match2[1];
        let currentNum = parseInt(match2[2]);
        let suffix = match2[3];
        for (let i = 1; i <= 5; i++) {
          if (i !== currentNum) {
            candidates.push(prefix + i + suffix);
          }
        }
      } else {
        // try to just append -1, -2
        let match3 = baseUrl.match(/(.*?)(\.(?:png|jpg|jpeg))/i);
        if (match3) {
            for(let i = 1; i <= 4; i++) {
                candidates.push(`${match3[1]}-${i}${match3[2]}`);
            }
        }
      }
    }

    let validImages = [];
    for (let url of candidates) {
      if (validImages.length >= 3) break; // We only need up to 3 extra images
      let isValid = await checkUrl(url);
      if (isValid) {
        validImages.push(url);
      }
    }

    let updateData = {
      hinh_anh_1: validImages[0] || null,
      hinh_anh_2: validImages[1] || null,
      hinh_anh_3: validImages[2] || null
    };

    if (validImages.length > 0) {
      await prisma.sanPham.update({
        where: { id: product.id },
        data: updateData
      });
      console.log(`Updated ${validImages.length} extra images for ${product.ten_san_pham}`);
    } else {
        console.log(`No valid extra images found for ${product.ten_san_pham}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
