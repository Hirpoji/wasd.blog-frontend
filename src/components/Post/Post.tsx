import React, { useState } from "react";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { ObjectId } from "mongodb";
import { useDispatch } from "react-redux";
import { fetchRemovePost } from "../../redux/Slices/posts";

interface PostProps {
  _id: ObjectId;
  imageUrl: string;
  user: {
    avatarUrl: string;
    fullName: string;
  };
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  classes: string;
  imgClasses: string;
  textClasses?: string;
  titleClasses?: string;
}

const Post: React.FC<PostProps> = ({
  _id,
  imageUrl,
  user,
  title,
  tags,
  createdAt,
  viewsCount,
  classes,
  imgClasses,
  textClasses,
  titleClasses,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispatch(fetchRemovePost(_id) as any);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <Link to={`/post/${_id}`} className={`bg-white rounded-2xl ${classes}`}>
        <img
          src={imageUrl ? `http://localhost:5554/${imageUrl}` : ""}
          className={`${imgClasses} min-h-full h-80 w-full object-cover`}
          alt={title}
        />
        <div className="py-6 px-7 gap-y-5 flex flex-col justify-between">
          <div className={`flex flex-col gap-y-5 ${textClasses}`}>
            <div className="flex gap-x-3 items-center">
              <div className="w-[32px] h-[32px] overflow-hidden">
                {user.avatarUrl ? (
                  <img
                    src={`http://localhost:5554/${user.avatarUrl}`}
                    className="rounded-full w-full h-full object-cover"
                    alt={`${user.fullName}'s avatar`}
                  />
                ) : (
                  <div className="w-[32px] h-[32px] bg-gray-300 rounded-full"></div>
                )}
              </div>
              <span className="font-medium">{user.fullName}</span>
            </div>
            <h2 className={`font-bold text-2xl ${titleClasses}`}>
              {title.slice(0, 50) + " ..."}
            </h2>
            <div className="flex gap-x-5 flex-wrap gap-y-2">
              {tags.map((tag, index) => (
                <div className="flex gap-x-1 items-center" key={index}>
                  {"#" + tag.charAt(0).toLowerCase() + tag.slice(1)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <AiOutlineEye />
              <span className="text-sm">{viewsCount}</span>
            </div>
            <span className="text-sm">{createdAt.replace(/T.*/, "")}</span>
          </div>
        </div>
      </Link>
      {hovered && location.pathname === "/user" && (
        <>
          <button
            onClick={onClickRemove}
            className="absolute top-5 right-4 text-red-600 hover:text-red-800 z-10"
          >
            <AiOutlineDelete className="w-6 h-6" />
          </button>
          <Link
            to={`/posts/${_id}/edit`}
            className="absolute top-5 right-12 text-blue-600 hover:text-blue-800 z-10"
          >
            <button>
              <AiOutlineEdit className="w-6 h-6" />
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Post;
