const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'trungkienh4444@gmail.com';
  
  // Cập nhật vai trò về lại khách hàng bình thường
  const updatedUser = await prisma.nguoiDung.update({
    where: { email: email },
    data: { vai_tro: 'KHACH_HANG' }
  });
  
  console.log('Đã hạ quyền user về KHACH_HANG thành công:', updatedUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
