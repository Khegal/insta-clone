// types.ts
export interface Post {
  _id: string;
  mediaUrl: string;
  description: string;
  likeCount: string;
  user: {
    profileUrl: string;
    username: string;
  };
}

export interface User {
  _id: string;
  profileUrl: string;
  username: string;
  fullname: string;
  bio: string;
  posts?: Post[];
}
