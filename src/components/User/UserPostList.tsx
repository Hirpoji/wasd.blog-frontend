import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import { PostState, UserState } from "../../types";
import axios from "../../axios";

interface RootStateType {
  posts: {
    items: PostState[];
    status: "loading" | "loaded" | "error";
  };
}

const UserPostList: FC = () => {
  const { data, status } = useSelector((state: UserState) => state.auth);
  const [posts, setPosts] = useState<PostState[]>([]);

  useEffect(() => {
    if (data && data._id) {
      axios
        .post(`/${data._id}/posts`)
        .then((res) => {
          console.log(res);
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [status]);

  return (
    <div className="grid gap-x-5 items-stretch mb-10 gap-y-10 col-start-5 col-end-13">
      {posts.length > 0 ? (
        <div className="font-bold text-2xl">Ваши статьи</div>
      ) : null}
      {posts.map((post: PostState, index) => {
        return (
          <div key={index} className="col-span-2"> 
            <Post
              _id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              tags={post.tags}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              user={post.user}
              text={post.text}
              classes={"grid lg:grid-cols-2 mb:grid-cols-2 grid-cols-1 col-start-1 col-end-13"}
              imgClasses={"lg:rounded-l-2xl mb:rounded-l-2xl lg:rounded-r-none mb:rounded-r-none rounded-t-2xl lg:!h-80 mb:!h-80 !h-60"}
              textClasses={"!gap-y-10"}
              titleClasses={"text-3xl"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserPostList;
