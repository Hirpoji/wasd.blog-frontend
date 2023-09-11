import { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineComment } from "react-icons/ai";
import { CommentsBlock } from "../components";
import AddComment from "../components/AddComment";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { ClipLoader } from "react-spinners";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ObjectId } from "mongodb";

interface Post {
  title: string;
  user: {
    avatarUrl: string;
    fullName: string;
  };
  text: string;
  tags: Array<string>;
  viewsCount: string;
  createdAt: string;
  imageUrl: string;
  comments: Array<Comment>;
}

interface Comment {
  text: string;
  user: {
    avatarUrl: string;
    fullName: string;
  };
  _id: ObjectId;
  createdAt: string;
}

const FullPost: FC = () => {
  const [post, setPost] = useState<Post>({
    title: "",
    user: { avatarUrl: "", fullName: "" },
    text: "",
    viewsCount: "",
    createdAt: "",
    tags: [],
    imageUrl: "",
    comments: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setPost(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex col-start-1 col-end-13 justify-center mt-20">
        <ClipLoader color="#000000" loading={true} size={100} className="" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-20">
      <div className="flex flex-col gap-y-6 bg-white rounded-2xl lg:p-20 md:p-20 p-5">
        <h1 className="font-extrabold lg:text-4xl md:text-4xl text-2xl leading-14 text-black col-span-12">
          {post.title}
        </h1>
        <div className="flex gap-x-3 items-center">
          <img
            src={
              post.user.avatarUrl
                ? `http://localhost:5554/${post.user.avatarUrl}`
                : ""
            }
            className={`h-10 rounded-3xl w-10 object-cover`}
          />
          <span className="font-medium">{post.user.fullName}</span>
        </div>

        <div className="flex gap-x-5 text-gray-600 flex-wrap">
          {post.tags.map((tag, index) => (
            <div className="flex gap-x-1 items-center" key={index}>
              # {tag.charAt(0).toLowerCase() + tag.slice(1)}
            </div>
          ))}
          <div className="flex gap-x-5 text-gray-600 ">
            <span>|</span>
            <div className="flex items-center">
              {post.createdAt.replace(/T.*/, "")}
            </div>
          </div>
        </div>
        <img
          src={`http://localhost:5554/${post.imageUrl}`}
          className={` lg:h-[500px] md:h-[500px] h-60 w-full object-cover rounded-xl`}
        />
        <ReactMarkdown children={post.text} className="md:text-xl lg:text-xl text-l"></ReactMarkdown>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <AiOutlineEye />
            <span className="text-sm">{post.viewsCount}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <AiOutlineComment />
            <span className="text-sm">{post.comments.length}</span>
          </div>
        </div>
      </div>
      <CommentsBlock items={post.comments}>
        <AddComment postId={id as any} />
      </CommentsBlock>
    </div>
  );
};

export default FullPost;
