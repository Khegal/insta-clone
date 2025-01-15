"use client";

import { redirect } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/contexts/userContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Post, PostLike } from "./types/types";
import { MainLayout } from "@/common/MainLayout";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user, accessToken } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3333/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    }
  };

  const toggleLike = async (postId: string) => {
    try {
      await axios.post(
        `http://localhost:3333/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      fetchPosts(); // Refresh posts after toggling like
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const isLiked = (postLikes: PostLike[], currentUserId: string) => {
    return postLikes.some((like) => like.user._id.toString() === currentUserId);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!user) {
    redirect("/signin");
    return null;
  }

  return (
    <MainLayout>
      <ul className="items-center">
        {posts.map((post) => (
          <li key={post._id}>
            <div className="mx-auto">
              <div className="px-4 py-[14px] flex items-center">
                {/* <Image
                  src={post.user?.profileUrl || "/noimage.png"}
                  alt={
                    post.user.profileUrl
                      ? "User profile picture"
                      : "No image available"
                  }
                  height={32}
                  width={32}
                  className="mr-4 rounded-full h-8 w-8"
                  style={{ objectFit: "cover" }}
                /> */}
                <Image
                  width={32}
                  height={32}
                  src={post.user?.profileUrl || "/noimage.png"}
                  alt=""
                  className="mr-4 object-cover w-8 h-8 rounded-full"
                />
                <Link
                  className="text-black text-sm leading-[18px] font-semibold"
                  href={`/${post.user.username}`}
                >
                  {post.user.username}
                </Link>
              </div>
              <Image
                priority
                width={430}
                height={400}
                src={post.mediaUrl}
                alt={post.description}
                style={{ height: "auto" }}
              />
              <div className="px-4">
                <div className="flex justify-between my-1">
                  <div className="flex">
                    <button
                      className="py-2 pr-2"
                      onClick={() => toggleLike(post._id)}
                    >
                      <svg
                        aria-label="Like"
                        fill={
                          isLiked(post.likes, user._id) ? "red" : "currentColor"
                        }
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Like</title>
                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                      </svg>
                    </button>
                    <button
                      className="py-2 pr-2"
                      onClick={() => {
                        router.push(`/post/${post._id}/comments`);
                      }}
                    >
                      <svg
                        aria-label="Comment"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Comment</title>
                        <path
                          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </button>
                    <button className="py-2 pr-2">
                      <svg
                        aria-label="Share"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Share</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    </button>
                  </div>
                  <button className="py-2">
                    <svg
                      aria-label="Save"
                      fill="currentColor"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Save</title>
                      <polygon
                        fill="none"
                        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polygon>
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => {
                    router.push(`/post/${post._id}/liked_by`);
                  }}
                >
                  <p className="text-sm font-semibold">
                    {post.likeCount} Likes
                  </p>
                </button>
                <div>
                  <span className="text-black text-sm leading-[18px] font-semibold">
                    {post.user.username}
                  </span>{" "}
                  {post.description}
                </div>
              </div>
              <br />
            </div>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};
export default Home;
