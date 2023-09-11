import { ObjectId } from "mongodb";
import React from "react";
import { FC } from "react";

interface Comment {
  _id: ObjectId;
  user: {
    fullName: string;
    avatarUrl: string;
  };
  text: string;
  createdAt: string;
}

interface CommentsBlockProps {
  items: Comment[];
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const CommentsBlock: FC<CommentsBlockProps> = ({ items, children }) => {
  return (
    <div className="lg:p-20 md:p-20 p-5 bg-white rounded-2xl flex flex-col gap-y-5">
      <h2 className="font-bold text-2xl leading-14 text-black">Комментарии</h2>
      <ul className="space-y-4">
        {items.length === 0 ? (
          <div className="w-full">Тут еще нет комментариев 😞</div>
        ) : (
          items.map((obj, index) => (
            <React.Fragment key={index}>
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10">
                  {obj.user.avatarUrl !== undefined ? (
                    <img
                      className="rounded-full object-cover w-full h-full"
                      src={`http://localhost:5554/${obj.user.avatarUrl}`}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div>
                    <h3 className="font-semibold text-">{obj.user.fullName}</h3>
                    <p>{obj.text}</p>
                  </div>
                </div>
              </li>
              {index < items.length - 1}
            </React.Fragment>
          ))
        )}
      </ul>
      {children}
    </div>
  );
};
