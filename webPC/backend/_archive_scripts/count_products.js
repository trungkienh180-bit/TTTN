const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.sanPham.findMany({
  where: { danh_muc_id: 5 } // Linh Kiện
}).then(products => {
  const vga = products.filter(p => p.vga).length;
  const main = products.filter(p => p.mainboard).length;
  const ssd = products.filter(p => p.o_cung).length;
  const cooler = products.filter(p => p.tan_nhiet).length;
  console.log(`VGA: ${vga}, Mainboard: ${main}, SSD: ${ssd}, Tản nhiệt: ${cooler}. Total Linh Kiện: ${products.length}`);
}).finally(() => prisma.$disconnect());
