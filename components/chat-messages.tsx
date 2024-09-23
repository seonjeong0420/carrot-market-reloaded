"use client";

import { InitialChatMessage } from "@/app/chats/[id]/page";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";

interface ChatMessageListProps {
  initialMessages: InitialChatMessage;
  userId: number;
}

const ChatMessagesList = ({ initialMessages, userId }: ChatMessageListProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMsg, setInputMsg] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMsg(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        payload: inputMsg,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          avatar: "xxx",
        },
      },
    ]);

    setInputMsg("");
  };

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

      <form className="flex relative" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMsg}
          name="inputMsg"
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          onChange={handleChange}
          placeholder="write a message"
          required
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessagesList;
