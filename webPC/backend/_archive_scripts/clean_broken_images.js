const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkImageValid(url) {
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      signal: AbortSignal.timeout(5000)
    });
    return res.status === 200 || res.status === 304;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log("Checking for broken extra images...");
  const products = await prisma.sanPham.findMany({
    where: {
      OR: [
        { hinh_anh_1: { not: null } },
        { hinh_anh_2: { not: null } },
        { hinh_anh_3: { not: null } }
      ]
    }
  });

  console.log(`Found ${products.length} products with extra images.`);
  
  let cleanedCount = 0;

  for (let product of products) {
    let updates = {};
    let needsUpdate = false;

    if (product.hinh_anh_1) {
      let valid = await checkImageValid(product.hinh_anh_1);
      if (!valid) { updates.hinh_anh_1 = null; needsUpdate = true; }
    }
    if (product.hinh_anh_2) {
      let valid = await checkImageValid(product.hinh_anh_2);
      if (!valid) { updates.hinh_anh_2 = null; needsUpdate = true; }
    }
    if (product.hinh_anh_3) {
      let valid = await checkImageValid(product.hinh_anh_3);
      if (!valid) { updates.hinh_anh_3 = null; needsUpdate = true; }
    }

    if (needsUpdate) {
      await prisma.sanPham.update({
        where: { id: product.id },
        data: updates
      });
      console.log(`Cleaned broken images for: ${product.ten_san_pham}`);
      cleanedCount++;
    }
  }

  console.log(`Finished cleaning! Removed broken images from ${cleanedCount} products.`);
}

main().finally(() => prisma.$disconnect());
