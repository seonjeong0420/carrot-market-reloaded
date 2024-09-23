"use client";

import { InitialChatMessage } from "@/app/chats/[id]/page";
import React, { useState } from "react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

interface ChatMessageListProps {
  initialMessages: InitialChatMessage;
  userId: number;
}

const ChatMessagesList = ({ initialMessages, userId }: ChatMessageListProps) => {
  const [messages, setMessages] = useState(initialMessages);

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-2 items-start ${msg.userId === userId && "flex-row-reverse"}`}>
          {msg.userId === userId ? null : (
            <>
              {msg.user.avatar !== null ? (
                <Image src={msg.user.avatar} width={16} height={16} alt={msg.user.username} className="object-cover" />
              ) : (
                <div className="size-8 rounded-full overflow-hidden border border-cyan-500">
                  <UserIcon />
                </div>
              )}
            </>
          )}

          <div className={`flex flex-col gap-1 ${msg.userId === userId && "items-end"}`}>
            <span className="bg-orange-500 p-2.5 rounded-md">{msg.payload}</span>
            <span className="text-xs">{formatToTimeAgo(msg.created_at.toString())}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessagesList;
