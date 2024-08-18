import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type PostsDetailProps = {
  params: { id: string };
};

const getPost = async (id: number) => {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1, // 게시글을 읽으면 조회수 1 증가
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    return null;
  }
};

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

const getLikedStatus = async (postId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
};

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const cachedOperation = nextCache(getLikedStatus, ["product-like-status"], {
    tags: [`like-status-${postId}`],
  });

  return cachedOperation(postId, session.id!);
}

const PostsDetail = async ({ params }: PostsDetailProps) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const likePost = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          postId: id,
          userId: session.id!,
        },
      });

      revalidateTag(`like-status-${id}`);
    } catch (error) {
      alert("이미 좋아요를 눌렀습니다.");
    }
  };

  const dislikePost = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.like.delete({
        where: {
          id: {
            postId: id,
            userId: session.id!,
          },
        },
      });

      revalidateTag(`like-status-${id}`);
    } catch (error) {
      alert("이미 좋아요를 해제했습니다.");
    }
  };

  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={post.user.avatar!}
          alt={"이미지"}
          width={28}
          height={28}
          className="size-7 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{post.user.username}</span>
          <span className="text-xs">
            {formatToTimeAgo(post.created_at.toString())}
          </span>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <form action={isLiked ? dislikePost : likePost}>
          <button
            className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 hover:bg-neutral-800 transition-colors ${
              isLiked ? "bg-orange-500 border-orange-500 text-white" : ""
            }`}
          >
            {isLiked ? (
              <>
                <HandThumbUpIcon className="size-5" />
                <span>({likeCount})</span>
              </>
            ) : (
              <>
                <OutlineHandThumbUpIcon className="size-5" />
                <span>공감하기 ({likeCount})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostsDetail;
