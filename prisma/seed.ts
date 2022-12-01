import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Frontend', color: '#A1AAEE' },
      { name: 'Backend', color: '#CEF6C4' },
      { name: 'Banco de Dados', color: '#FFF383' },
      { name: 'Design', color: '#B37BFB' },
      { name: 'Mobile', color: '#C4F6F3' },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
