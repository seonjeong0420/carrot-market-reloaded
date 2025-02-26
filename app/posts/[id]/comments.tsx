import db from "@/lib/db";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
/**
 * 코드 챌린지 - schema 생성, 데이터 fetch, optimistic response
 * 1. 생성된 모든 댓글 보여주기
 * 2. 유저가 댓글을 작성할 수 있는 form 만들기
 * 3. 유저가 댓글을 보내면 로딩 상태를 보여주지 말고 해당 댓글을 댓글 목록에 추가하기
 */

import React from "react";
import { formatToTimeAgo } from "../../../lib/utils";
import getSession from "@/lib/session";

interface CommentProps {
  id: number;
  payload: string;
  created_at: Date;
  userId: number;
  user: {
    username: string;
    avatar: string | null;
  };
}

type Props = { postId: number; comments: CommentProps[] };

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return user;
  }
};

const Comments = async ({ postId, comments }: Props) => {
  const user = await getUser();
  const avatar = user?.avatar;

  return (
    <div className="flex flex-col gap-10 mt-5 pt-10 border-t border-neutral-600">
      {comments.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <div className="size-10 rounded-full overflow-hidden">
            {item.user.avatar !== null ? (
              <Image
                src={item.user.avatar}
                width={40}
                height={40}
                alt="사용자 아바타"
                className="object-cover"
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div>
            <div className="*:text-sm flex gap-2">
              <span className="">{item.user.username}</span>
              <span className="text-neutral-500">
                {formatToTimeAgo(item.created_at.toString())}
              </span>
            </div>
            <p className="text-md">{item.payload}</p>
          </div>
        </div>
      ))}
      <div>
        <form action="" className="flex gap-4 justify-between">
          <div className="size-10 rounded-full overflow-hidden">
            {avatar !== null ? (
              <Image
                src={avatar!}
                width={40}
                height={40}
                alt="사용자 아바타"
                className="object-cover"
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <input
            type="text"
            placeholder="댓글 추가"
            className="flex-1 pr-4 pl-4 rounded-md text-black"
          />
          <button>등록</button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
