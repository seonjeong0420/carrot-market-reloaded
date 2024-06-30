import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const test = async () => {
  const user = await db.user.create({
    data: {
      username: "dbdbdb",
      phone: "121212",
    },
  });
  console.log(user);
};

test();

export default db;
