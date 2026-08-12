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

  // Get all phu_kien and their images
  const [phuKienList] = await connection.execute('SELECT ma_phu_kien, ten_phu_kien FROM phu_kien');
  
  let migratedCount = 0;

  for (let pk of phuKienList) {
    const [images] = await connection.execute('SELECT duong_dan_anh FROM hinh_anh_san_pham WHERE ma_phu_kien = ?', [pk.ma_phu_kien]);
    
    if (images.length > 0) {
      // Find this product in our new database
      const product = await prisma.sanPham.findFirst({
        where: { ten_san_pham: pk.ten_phu_kien }
      });
      
      if (product) {
        let updateData = {};
        if (images[0]) updateData.hinh_anh_1 = images[0].duong_dan_anh;
        if (images[1]) updateData.hinh_anh_2 = images[1].duong_dan_anh;
        if (images[2]) updateData.hinh_anh_3 = images[2].duong_dan_anh;
        
        if (Object.keys(updateData).length > 0) {
          await prisma.sanPham.update({
            where: { id: product.id },
            data: updateData
          });
          console.log(`Migrated ${images.length} extra images for ${product.ten_san_pham}`);
          migratedCount++;
        }
      }
    }
  }

  console.log(`Finished migrating images for ${migratedCount} products.`);
  await connection.end();
}

main().finally(() => prisma.$disconnect());
