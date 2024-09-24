import db from "@/lib/db";
import getSession from "@/lib/session";
import React from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

/**
 * code challenge
 * 1. 내가 속한 모든 채팅방 show
 * 2. 나와 채팅하고 있는 상대방의 avatar show
 * 3. 최신 메세지 show
 */

const Chats = async () => {
  const session = await getSession();
  const chatInfo = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
      message: {
        take: 1,
        // where: { // 내가 보낸 대화 없이 상대방의 최신 대화 show
        //   userId: {
        //     not: session.id,
        //   },
        // },
        orderBy: {
          created_at: "desc",
        },
      },
      users: {
        where: {
          id: {
            not: session.id,
          },
        },
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 p-6">{chatInfo.length > 0 ? chatInfo.map((item) => <GetChat key={item.id} id={item.id} message={item.message} users={item.users} />) : <>채팅없음</>}</div>
  );
};

export default Chats;

type GetChatProps = {
  id: string;
  message: {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    chatRoomId: string;
    userId: number;
    isRead?: boolean;
  }[];
  users: {
    username: string;
    avatar: string | null;
  }[];
};
const GetChat = ({ id, message, users }: GetChatProps) => {
  const user = users[0];
  const chatMsg = message[0];

  return (
    <Link href={`/chats/${id}`} className="flex items-center justify-between gap-4 px-4 py-2 text-white border rounded-md">
      <span>
        {user.avatar ? (
          <Image src={user.avatar} width={24} height={24} alt={user.username} className="object-cover" />
        ) : (
          <span className="flex size-10 rounded-full overflow-hidden text-white">
            <UserCircleIcon />
          </span>
        )}
      </span>
      <div className="flex-1">
        <span className="text-base text-gray-100 font-medium">{user.username}</span>
        <p className="text-lg">{chatMsg.payload}</p>
      </div>
      <span>{chatMsg.isRead ? "읽음" : "안읽음"}</span>
    </Link>
  );
};
