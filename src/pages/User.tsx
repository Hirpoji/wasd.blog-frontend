import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../redux/Slices/auth";
import { selectIsAuth } from "../redux/Slices/auth";
import { Navigate } from "react-router-dom";
import UserPostList from "../components/User/UserPostList";
import UserBar from "../components/User/UserBar";

const User: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe() as any);
  }, [dispatch]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="lg:grid lg:grid-cols-12 mb:grid mb:grid-cols-12 flex flex-col gap-y-6 ">
      <UserBar />
      <UserPostList />
    </div>
  );
};

export default User;
