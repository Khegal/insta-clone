"use client";

import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Post } from "./types/types";
import { MainLayout } from "@/common/MainLayout";

export default function Home() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
      });
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
            <div className="">
              <Image
                objectFit="contain"
                width={400}
                height={400}
                src={post.mediaUrl}
                alt=""
                className="mx-auto"
              />
              {post.description}
              <br />
              <Link className="text-blue-500" href={`/${post.user.username}`}>
                @{post.user.username}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}
