import Button from "./UI/Button";
import { FC } from "react";
import axios from "../axios";
import { useState } from "react";
import { selectIsAuth } from "../redux/Slices/auth";
import { useSelector } from "react-redux";

interface AddComment {
  postId: string;
}

const AddComment: FC<AddComment> = ({ postId }) => {
  const [commentText, setCommentText] = useState("");

  const isAuth = useSelector(selectIsAuth);

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;

    if (!isAuth) {
      alert("Для добавления комментария нужно быть авторизированным");
      return;
    }

    axios
      .post(`/posts/${postId}/comments`, { text: commentText })
      .then(() => {
        setCommentText("");
        location.reload();
        alert("Комментарий добавлен");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full flex flex-col gap-y-5 mt-5">
      <textarea
        className="border border-gray-300 p-5 rounded-lg"
        placeholder="Написать комментарий"
        rows={3}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          classes="!bg-black text-white px-4 py-2 rounded-3xl"
          onclick={handleCommentSubmit}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
