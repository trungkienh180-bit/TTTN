const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'trungkienh4444@gmail.com';
  
  // Kiểm tra xem user có tồn tại không
  const userExists = await prisma.nguoiDung.findUnique({
    where: { email: email }
  });

  if (!userExists) {
    console.log(`Không tìm thấy user với email: ${email}`);
    return;
  }

  // Cập nhật vai trò
  const updatedUser = await prisma.nguoiDung.update({
    where: { email: email },
    data: { vai_tro: 'QUAN_TRI_VIEN' }
  });
  
  console.log('Đã cấp quyền QUAN_TRI_VIEN thành công cho user:', updatedUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
