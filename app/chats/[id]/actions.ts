"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export const saveChatMessage = async (payload: string, chatRoomId: string) => {
  const session = await getSession(); // msg를 보내는 user 받아오기
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!,
    },
    select: {
      id: true,
    },
  });
};
