import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// const test = async () => {
//   const token = await db.sMSToken.create({
//     data: {
//       token: "12121212",
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });

//   // console.log(token);
// };

// test();

export default db;
