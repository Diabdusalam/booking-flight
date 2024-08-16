import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const password = bcrypt.hashSync("admin321", 10);
  const userSeed = await prisma.users.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      password: password,
    },
  });
  console.log(userSeed);
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
