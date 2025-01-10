"use client";

import { redirect, useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { User } from "@/app/types/types";
import Image from "next/image";
import { UserContext } from "@/contexts/userContext";

export default function LikedByPage() {
  const { postId } = useParams();
  const { accessToken } = useContext(UserContext);
  const [likedBy, setLikedBy] = useState<User[]>([]);

  if (!accessToken) {
    redirect("/signin");
  }

  useEffect(() => {
    if (postId && accessToken) {
      axios
        .get(`http://localhost:3333/api/posts/${postId}/liked_by`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setLikedBy(res.data);
        })
        .catch((err) => {
          console.error("Error fetching liked users:", err);
        });
    }
  }, [postId, accessToken]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Users who liked this post</h1>
      {likedBy.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {likedBy.map((user) => (
            <li
              key={user._id}
              className="flex items-center border-b py-2 text-lg font-medium text-gray-700"
            >
              <div className="mr-4">
                <Image
                  src={user.profileUrl ? `/${user.profileUrl}` : "/noimage.png"}
                  alt={
                    user.profileUrl
                      ? "User profile picture"
                      : "No image available"
                  }
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              {user.username}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">No likes yet.</p>
      )}
    </div>
  );
}
