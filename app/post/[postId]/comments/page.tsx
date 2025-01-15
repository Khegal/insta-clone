"use client";

import { redirect, useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect, useContext, useCallback } from "react";
import { Post, PostComment } from "@/app/types/types";
import Image from "next/image";
import { UserContext } from "@/contexts/userContext";

const PostDetailPage = () => {
  const { postId } = useParams(); // Get the dynamic postId from the URL
  const { accessToken } = useContext(UserContext); // Access token from context
  const [post, setPost] = useState<Post | null>(null); // State to hold the post data
  const [comments, setComments] = useState<PostComment[]>([]); // State to hold comments
  const [newComment, setNewComment] = useState(""); // State to handle new comment input

  const fetchPostAndComments = useCallback(async () => {
    try {
      const postResponse = await axios.get(`http://localhost:3333/api/posts/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const selectedPost = postResponse.data.find(
        (post: Post) => post._id === postId
      );

      if (selectedPost) {
        setPost(selectedPost); // Set the post data
        setComments(selectedPost.comments || []); // Set the comments from the selected post
      } else {
        console.error("Post not found");
      }
    } catch (err) {
      console.error("Error fetching post or comments:", err);
    }
  }, [postId, accessToken]); // Dependencies for fetching post and comments

  useEffect(() => {
    if (!accessToken) {
      redirect("/signin");
    } else {
      fetchPostAndComments();
    }
  }, [postId, accessToken, fetchPostAndComments]); // Now includes fetchPostAndComments in the dependency array

  // Handle new comment submission
  const handleCommentSubmit = async () => {
    if (!newComment) return; // Don't submit empty comments

    try {
      await axios.post(
        `http://localhost:3333/api/posts/${postId}/comments`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNewComment(""); // Clear the comment input field

      // Refetch the post and comments after the comment is posted
      fetchPostAndComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="container mx-auto p-4 relative flex flex-col h-screen">
      {post && (
        <>
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{post.description}</h1>
            {post.mediaUrl && (
              <Image
                src={post.mediaUrl}
                width={430}
                height={400}
                alt="Post Media"
                className="mt-4"
              />
            )}
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <Image
                  width={32}
                  height={32}
                  src={post.user?.profileUrl || "/noimage.png"}
                  alt=""
                  className="mr-2 object-cover w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{post.user?.username}</span>
              </div>
            </div>
          </div>

          <div className="mb-4 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold">Comments</h2>
            {comments.length > 0 ? (
              <div className="mt-4 space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex items-center space-x-4"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={comment.user?.profileUrl || "/noimage.png"}
                      alt=""
                      className="object-cover w-8 h-8 rounded-full"
                    />
                    <div className="flex gap-3">
                      <div className="font-semibold">
                        {comment.user?.username}
                      </div>
                      <div>{comment.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="mt-4 absolute bottom-0 left-0 right-0 z-10 bg-white p-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Post Comment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
