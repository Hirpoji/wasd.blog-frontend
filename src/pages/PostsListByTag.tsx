import { FC, useEffect, useState } from "react";
import Post from "../components/Post/Post";
import { PostState } from "../types";
import axios from "../axios";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const PostsListByTag: FC = () => {
  const [postsList, setPostsList] = useState<PostState[] | undefined>(
    undefined
  );

  const { tag } = useParams<{ tag: string | undefined }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tag) {
      axios
        .get(`/posts/tag/${tag}`)
        .then((res) => {
          setPostsList(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [tag, isLoading]);

  if (isLoading) {
    return (
      <div className="flex col-start-1 col-end-13 justify-center mt-20">
        <ClipLoader color="#000000" loading={true} size={100} className="" />
      </div>
    );
  }

  if (!postsList) {
    return <div>No posts found</div>;
  }

  return (
    <div className="grid gap-x-5 items-stretch mb-10 gap-y-10 grid-cols-2 col-start-1 col-end-13">
      <div className="font-bold text-2xl">
        {"#" + tag?.charAt(0).toLowerCase() + tag?.slice(1)}
      </div>
      {postsList.map((post, index) => {
        const isMainPost = index === 0;
        const commonPostClasses = isMainPost ? "col-span-2" : "col-span-1";
        const imgClasses = isMainPost ? "rounded-l-2xl" : "rounded-t-2xl";
        const titleClasses = isMainPost ? "text-3xl" : "";
        const textClasses = isMainPost ? "!gap-y-10" : "";
        const postClasses = isMainPost
          ? "grid grid-cols-2 col-start-1 col-end-13"
          : "flex flex-col col-start-1 col-end-7";

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

export default PostsListByTag;
