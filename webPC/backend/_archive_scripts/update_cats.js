const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const categories = await prisma.danhMuc.findMany();
  console.log("Categories:", categories);
  
  // We want to rename "Phụ kiện" (if exists) to "Linh Kiện"
  // And merge "Chuột & Bàn phím", "Tai nghe" into "Gaming Gear"
  
  let gamingGear = await prisma.danhMuc.findFirst({ where: { ten_danh_muc: 'Gaming Gear' } });
  if (!gamingGear) {
    gamingGear = await prisma.danhMuc.create({ data: { ten_danh_muc: 'Gaming Gear', mo_ta: 'Gaming Gear' } });
    console.log("Created Gaming Gear");
  }

  // Update products in Tai nghe and Chuột & Bàn phím to Gaming Gear
  for (const cat of categories) {
    if (['Tai nghe', 'Chuột & Bàn phím'].includes(cat.ten_danh_muc)) {
       await prisma.sanPham.updateMany({
         where: { danh_muc_id: cat.id },
         data: { danh_muc_id: gamingGear.id }
       });
       console.log(`Moved products from ${cat.ten_danh_muc} to Gaming Gear`);
       // optionally delete old cat
       await prisma.danhMuc.delete({ where: { id: cat.id } });
       console.log(`Deleted category ${cat.ten_danh_muc}`);
    }
    
    if (cat.ten_danh_muc.toLowerCase().includes('phụ kiện')) {
       await prisma.danhMuc.update({
         where: { id: cat.id },
         data: { ten_danh_muc: 'Linh Kiện Máy Tính' }
       });
       console.log(`Renamed ${cat.ten_danh_muc} to Linh Kiện Máy Tính`);
    }
  }

  const updatedCats = await prisma.danhMuc.findMany();
  console.log("Updated Categories:", updatedCats);
}

check().finally(() => prisma.$disconnect());
