const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const categories = await prisma.danhMuc.findMany();
  
  const linhKienCat = categories.find(c => c.ten_danh_muc === 'Linh Kiện Máy Tính' || c.ten_danh_muc.toLowerCase().includes('linh kiện'));
  
  if (!linhKienCat) {
    console.log("No Linh Kien category found.");
    return;
  }

  for (const cat of categories) {
    if (['RAM', 'Card Màn Hình (VGA)', 'Màn Hình'].includes(cat.ten_danh_muc)) {
       await prisma.sanPham.updateMany({
         where: { danh_muc_id: cat.id },
         data: { danh_muc_id: linhKienCat.id }
       });
       console.log(`Moved products from ${cat.ten_danh_muc} to Linh Kien`);
       
       await prisma.danhMuc.delete({ where: { id: cat.id } });
       console.log(`Deleted category ${cat.ten_danh_muc}`);
    }
  }

  console.log("Updated Categories:", await prisma.danhMuc.findMany());
}

check().finally(() => prisma.$disconnect());
