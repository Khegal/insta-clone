"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { User, Post } from "../types/types";
import { MainLayout } from "@/common/MainLayout";
import { CiCamera } from "react-icons/ci";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";

const Page = () => {
  const { username } = useParams();
  const { user: currentUser, accessToken } = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/signin");
    }
  }, [currentUser, router]);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3333/api/user/${username}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  // Fetch posts after user data changes
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3333/api/posts/user/${user._id}`)
        .then((res) => setPosts(res.data))
        .catch(() => setPosts([]));
    }
  }, [user]);

  // Handle image upload
  const onImageUpload = (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`http://localhost:3333/api/users/${username}/image`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(() => {
        // Refresh user data after image update
        fetchUser();
        toast.success("Profile image updated successfully");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Failed to update profile image"
        );
      })
      .finally(() => {
        setUploading(false);
      });
  };

  if (!user) return null;

  const isOwner = currentUser?._id === user._id;

  const isFollowing = user.followers.some(
    (follower) => follower.user._id === currentUser?._id
  );

  const handleFollowToggle = async () => {
    if (!currentUser || loading) return;

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:3333/api/user/${user._id}/follow`,
        {},
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      // Refresh user data
      fetchUser();
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden group">
              {user.profileUrl && (
                <Image
                  alt=""
                  src={user.profileUrl}
                  width={100}
                  height={100}
                  className="border w-[100px] h-[100px] rounded-full object-cover"
                />
              )}
              {uploading && (
                <div className="absolute top-0 left-0 z-10 grid w-full h-full bg-black/50 place-items-center">
                  <CgSpinner className="text-white spin" size={24} />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center invisible transition-all duration-300 opacity-0 cursor-pointer bg-black/30 h-1/3 group-hover:opacity-100 group-hover:visible">
                <input
                  onChange={onImageUpload}
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <CiCamera size={24} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              {isOwner ? (
                <button className="rounded-lg px-4 py-1 bg-[#00000010]">
                  Edit profile
                </button>
              ) : (
                <button
                  className={`rounded-lg px-4 py-1 ${
                    isFollowing
                      ? "bg-[#00000040] text-black"
                      : "bg-[#00000010] text-black"
                  }`}
                  onClick={handleFollowToggle}
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}

              <div className="flex gap-4">
                <div>
                  {posts.length} <span className="font-semibold">posts</span>
                </div>
                <div>
                  {user.followers.length}{" "}
                  <span className="font-semibold">followers</span>
                </div>
                <div>
                  {user.following.length}{" "}
                  <span className="font-semibold">following</span>
                </div>
              </div>
            </div>
          </div>
          <span>
            <span className="font-semibold">{user.fullname}</span>
            <br />
            {user.bio}
          </span>
        </div>
      </div>
      <div className="flex gap-[5px] flex-wrap">
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-[140px] h-[140px] overflow-hidden relative"
          >
            <Image
              src={post.mediaUrl}
              alt={post.description}
              fill
              style={{ objectFit: "cover" }}
              sizes="140px, 140px, 140px"
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Page;
