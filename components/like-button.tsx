"use client";

import React, { useOptimistic } from "react";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { dislikePost, likePost } from "@/app/posts/[id]/actions";

type Props = {
  isLiked: boolean;
  likeCount: number;
  postId: number;
};

const LikeButton = ({ isLiked, likeCount, postId }: Props) => {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClickHandler = async () => {
    reducerFn(undefined);

    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };
  return (
    <button
      onClick={onClickHandler}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors ${
        state.isLiked ? "bg-orange-500 border-orange-500 text-white" : ""
      }`}
    >
      {state.isLiked ? (
        <>
          <HandThumbUpIcon className="size-5" />
          <span>({state.likeCount})</span>
        </>
      ) : (
        <>
          <OutlineHandThumbUpIcon className="size-5" />
          <span>공감하기 ({state.likeCount})</span>
        </>
      )}
    </button>
  );
};

export default LikeButton;
