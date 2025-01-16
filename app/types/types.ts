export interface PostComment {
  _id: string;
  comment: string;
  user: User;
  post: string;
}

export interface PostLike {
  _id: string;
  user: User;
  post: string;
}

export interface Post {
  _id: string;
  mediaUrl: string;
  description: string;
  likeCount: number; // Change this to number for proper counting
  likes: PostLike[];
  comments: PostComment[]; // Change this to 'comments' (plural) for consistency
  user: User;
}

// Interface for a single Follower
export interface Follower {
  user: {
    _id: string; // User's unique identifier
    username: string; // Username of the follower
    id: string; // Same as _id, can be removed if unnecessary
  };
  follow: string; // The ID of the user being followed
  createdAt: string; // Date when the follow relationship was created
  updatedAt: string; // Date when the follow relationship was updated
  __v: number; // Version key (used internally by MongoDB)
}

// Interface for User with followers and following
export interface User {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  profileUrl: string;
  followers: Follower[]; // Array of followers (each follower is an object)
  following: Follower[]; // Array of people the user is following
  followersCount: number; // Total followers count
  followingCount: number; // Total following count
  postCount: number; // Number of posts by the user
  bio: string; // Bio of the user
  updatedAt: string; // Date of the last update
}
