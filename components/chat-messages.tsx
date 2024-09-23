"use client";

import { InitialChatMessage } from "@/app/chats/[id]/page";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { formatToTimeAgo } from "@/lib/utils";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoanR4YWFqdXRnY3NsZ2JzeXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNzc1MzUsImV4cCI6MjA0MjY1MzUzNX0.3jXBJNI8AxZiIxYOpHMuUGsuSG_6w31n4UeCON2qcCE"; // supabase > project settings > API > Project API keys (public)
const SUPABASE_URL = "https://jhjtxaajutgcslgbsyrl.supabase.co"; // supabase > project settings > API > Project URL
interface ChatMessageListProps {
  initialMessages: InitialChatMessage;
  userId: number;
  chatRoomId: string;
}

const ChatMessagesList = ({ initialMessages, userId, chatRoomId }: ChatMessageListProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMsg, setInputMsg] = useState("");
  const channel = useRef<RealtimeChannel>(); // 컴포넌트 내의 여러 함수 간의 데이터를 공유할 수 있도록 해준다. (재렌더링을 트리거 하지 않고, 렌더링이 발생한다면 해당 데이터는 유지)

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
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: { message: inputMsg },
    });
    setInputMsg("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`); // channel의 고유한 이름 지정하기
    channel.current
      .on("broadcast", { event: "message" }, (paylaod) => {
        console.log(paylaod);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

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
