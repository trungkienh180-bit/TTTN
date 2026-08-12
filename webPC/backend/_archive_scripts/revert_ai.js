const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const categories = await prisma.danhMuc.findMany();
    const pcGaming = categories.find(c => c.ten_danh_muc.toUpperCase().includes('GAMING'));
    const pcDoHoa = categories.find(c => c.ten_danh_muc.toUpperCase().includes('ĐỒ HỌA') || c.ten_danh_muc.toUpperCase().includes('RENDER'));
    const pcAi = categories.find(c => c.ten_danh_muc.toUpperCase().includes('AI'));

    if (!pcAi) return console.log("Khong co muc AI");

    const aiProducts = await prisma.sanPham.findMany({
      where: { danh_muc_id: pcAi.id }
    });

    console.log(`Tìm thấy ${aiProducts.length} sản phẩm trong mục AI`);

    // We only want to revert the 9 products we moved.
    // Let's assume the very first product in AI (oldest) was the original one.
    // Order by tao_luc ascending, skip the first one? No, wait. 
    // Just revert all except the one that doesn't belong to the 9.
    // The names of the 9 products are:
    const movedNames = [
      "PC DESIGNER - 3D RENDER - EDIT VIDEO AMD Ryzen 9 9950X / RTX 5090 32GB OC",
      "PC Intel Core Ultra 7 265K / VGA RTX 5080",
      "PC AMD Ryzen 7 9800X3D / VGA RTX 5080 (Powered by MSI)",
      "PC Intel Core Ultra 7 265F / VGA RTX 5080",
      "PC Intel i7-14700F / VGA RTX 5080",
      "PC Fractal Design Gaming Ryzen 7 9800X3D / RTX 5070 12GB OC WHITE",
      "PC Intel i7-14700F / VGA RTX 5070Ti (DDR5)",
      "PC DESIGNER - 3D RENDER - EDIT VIDEO RYZEN 9 9950X / RTX 5070 Ti 16GB (All NEW - Bảo hành 36 tháng - Nâng cấp RAM 32GB DDR5, SSD 500GB, Tản nhiệt khí)",
      "PC ULTRA GAMING LUXURY i7 14700KF / RTX 5060 Ti 16GB"
    ];

    let count = 0;
    for (const p of aiProducts) {
      if (movedNames.includes(p.ten_san_pham)) {
        // Decide category based on name
        let targetId = pcGaming ? pcGaming.id : 1;
        if (p.ten_san_pham.includes('DESIGNER') || p.ten_san_pham.includes('RENDER')) {
          targetId = pcDoHoa ? pcDoHoa.id : targetId;
        }
        
        await prisma.sanPham.update({
          where: { id: p.id },
          data: { danh_muc_id: targetId }
        });
        console.log(`Đã trả về: ${p.ten_san_pham} -> Danh mục ID: ${targetId}`);
        count++;
      }
    }
    console.log(`Hoàn tất trả về ${count} sản phẩm.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
