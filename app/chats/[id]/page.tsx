import ChatMessagesList from "@/components/chat-messages";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
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

// 모든 메세지를 가져오는 함수
const getMessages = async (chatRoomId: string) => {
  const message = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      isRead: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });

  return message;
};

const getUserProfile = async () => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });

  return user;
};

export type InitialChatMessage = Prisma.PromiseReturnType<typeof getMessages>;
const ChatRoom = async ({ params }: Props) => {
  const room = await getRoom(params.id); // 채팅 데이터 불러오기
  if (!room) {
    return notFound();
  }

  const initialMessages = await getMessages(params.id);
  const session = await getSession();
  const userInfo = await getUserProfile();
  const readMsg = async (msgId: number) => {
    "use server";
    await db.message.update({
      where: {
        id: msgId,
      },
      data: {
        isRead: true,
      },
    });
  };

  if (initialMessages.length > 0 && initialMessages[initialMessages.length - 1].userId !== session.id && !initialMessages[initialMessages.length - 1].isRead) {
    readMsg(initialMessages[initialMessages.length - 1].id);
  }

  if (!userInfo) {
    return notFound();
  }

  return <ChatMessagesList chatRoomId={params.id} userId={session.id!} username={userInfo.username} avatar={userInfo.avatar!} initialMessages={initialMessages} readMsg={readMsg} />;
};

export default ChatRoom;
