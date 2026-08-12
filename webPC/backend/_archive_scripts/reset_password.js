const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const email = 'trungkienh4444@gmail.com';
  
  const userExists = await prisma.nguoiDung.findUnique({
    where: { email: email }
  });

  if (!userExists) {
    console.log(`Không tìm thấy user với email: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash('123456', 10);

  const updatedUser = await prisma.nguoiDung.update({
    where: { email: email },
    data: { mat_khau: hashedPassword }
  });
  
  console.log('Đã reset mật khẩu thành công cho user:', updatedUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
