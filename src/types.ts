import { ObjectId } from "mongodb";

export interface UserState {
  auth: {
    data: {
      _id: ObjectId;
      fullName: string;
      avatarUrl: string;
      email: string;
      createdAt: string;
      updateAt: string;
    };
    status: "loading" | "loaded" | "error";
  };
}

export interface PostState {
  _id: ObjectId;
  tags: Array<string>;
  createdAt: string;
  title: string;
  text: string;
  imageUrl: string;
  viewsCount: number;
  user: {
    avatarUrl: string;
    fullName: string;
    email : string;
  };
}

export interface TagState {
  id: number;
  title: string;
  content: string;
}
