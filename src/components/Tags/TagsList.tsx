import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import axios from "../../axios";
import { RootState } from "../../redux/store";
import { fetchTags } from "../../redux/Slices/tags";
import { Link } from "react-router-dom";

const TagsList: FC = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state: RootState) => state);

  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchTags() as any);
    axios.get("/posts/tags");
  }, []);

  if (isTagsLoading) {
    return (
      <div className="flex col-start-1 col-end-13 justify-center mt-20">
        <ClipLoader color="#000000" loading={true} size={100} className="" />
      </div>
    );
  }

  return (
    <div className="flex lg:gap-x-5 mb:gap-x-5 gap-x-2 mb-10 gap-y-10 col-start-1 col-end-13 bg-white rounded-2xl lg:p-20 md:p-20 p-8 flex-wrap">
      {tags.items.map((tag: string) => (
        <Link
          to={`/tag/${tag}`}
          key={tag}
          className={`border border-black p-1 px-2 h-8 hover:text-white hover:bg-black hover:cursor-pointer `}
        >
          <span>{"#" + tag.charAt(0).toLowerCase() + tag.slice(1)}</span>
        </Link>
      ))}
    </div>
  );
};

export default TagsList;
