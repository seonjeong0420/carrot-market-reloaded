import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

const getRoom = async (id: string) => {
  const room = await db.chatRoom.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });

  // room이 select 되면, 현재 로그인한 사용자의 세션을 얻기.
  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find((user) => user.id === session.id));

    if (!canSee) {
      return null;
    }
  }

  return room;
};

const ChatRoom = async ({ params }: Props) => {
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  return <div>chat !! </div>;
};

export default ChatRoom;
