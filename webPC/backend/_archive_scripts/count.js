const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.danhMuc.findFirst({where: {ten_danh_muc: {contains: 'Màn hình'}}});
  if (!cat) return console.log('No monitor category');
  const count = await prisma.sanPham.count({where: {danh_muc_id: cat.id}});
  const monitors = await prisma.sanPham.findMany({where: {danh_muc_id: cat.id}, select: {ten_san_pham: true}});
  console.log('Total:', count);
  monitors.forEach(m => console.log('- ' + m.ten_san_pham));
}
main().finally(async () => await prisma.$disconnect());
