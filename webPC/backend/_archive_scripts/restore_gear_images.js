const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'laptop_store'
  });

  // Get all phu_kien
  const [phuKienList] = await connection.execute('SELECT ten_phu_kien, anh_dai_dien FROM phu_kien');
  
  let restoredCount = 0;

  for (let pk of phuKienList) {
    const product = await prisma.sanPham.findFirst({
      where: { ten_san_pham: pk.ten_phu_kien }
    });
    
    if (product) {
      await prisma.sanPham.update({
        where: { id: product.id },
        data: {
          hinh_anh: pk.anh_dai_dien,
          hinh_anh_1: null,
          hinh_anh_2: null,
          hinh_anh_3: null
        }
      });
      console.log(`Restored original image for ${product.ten_san_pham}`);
      restoredCount++;
    }
  }

  console.log(`Finished restoring images for ${restoredCount} products.`);
  await connection.end();
}

main().finally(() => prisma.$disconnect());
