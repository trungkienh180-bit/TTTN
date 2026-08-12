const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.danhMuc.findMany().then(console.log).finally(() => prisma.$disconnect());
