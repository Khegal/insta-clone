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

export interface User {
  _id: string;
  profileUrl: string;
  username: string;
  fullname: string;
  bio: string;
  posts?: Post[]; // Optional if the user may not have posts
}
