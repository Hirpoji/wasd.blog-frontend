import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  fetchPostsByViewsCount,
  fetchPostsByCreatedAt,
} from "../../redux/Slices/posts";
import Post from "./Post";
import { PostState } from "../../types";

interface RootStateType {
  home: {
    value: string;
  };
  posts: {
    items: PostState[];
    status: "loading" | "loaded" | "error";
  };
}

const PostsList: FC = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state: RootStateType) => state.home);
  const { items, status } = useSelector((state: RootStateType) => state.posts);

  useEffect(() => {
    if (value === "Последние") {
      dispatch(fetchPostsByCreatedAt() as any);
    }
    if (value === "Популярные") {
      dispatch(fetchPostsByViewsCount() as any);
    }
  }, [dispatch, value]);

  if (status === "loading") {
    return (
      <div className="flex col-start-1 col-end-13 justify-center mt-20">
        <ClipLoader color="#000000" loading={true} size={100} className="" />
      </div>
    );
  }
  return (
    <div className="grid gap-x-5 items-stretch mb-10 gap-y-10 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 col-start-1 col-end-13">
      {items.map((post, index) => {
        const isMainPost = index === 0;
        const commonPostClasses = isMainPost
          ? "col-span-2"
          : "lg:col-span-1 md:col-span-1 col-span-2";
        const imgClasses = isMainPost
          ? "lg:rounded-l-2xl md:rounded-l-2xl lg:rounded-r-none md:rounded-r-none rounded-t-2xl lg:!h-80 md:!h-80 !h-60"
          : "rounded-t-2xl lg:!h-80 md:!h-80 !h-60";
        const titleClasses = isMainPost ? "lg:text-3xl md:text-3xl" : "";
        const textClasses = isMainPost ? "lg:!gap-y-10 md:!gap-y-10 " : "";
        const postClasses = isMainPost
          ? "md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 flex flex-col col-start-1 col-end-13"
          : "flex flex-col lg:col-start-1 lg:col-end-7 md:col-start-1 md:col-end-7 col-start-1 col-end-13";

        return (
          <div className={commonPostClasses} key={index}>
            <Post
              _id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              tags={post.tags}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              user={post.user}
              text={post.text}
              classes={postClasses}
              imgClasses={imgClasses}
              textClasses={textClasses}
              titleClasses={titleClasses}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
