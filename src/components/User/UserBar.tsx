import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { fetchAuthMe, logout } from "../../redux/Slices/auth";
import { UserState } from "../../types";
import Button from "../UI/Button";

const UserBar: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe() as any);
  }, [dispatch]);

  const { data, status } = useSelector((state: UserState) => state.auth);

  if (status === "loading") {
    return (
      <div className="flex col-start-1 col-end-13 justify-center mt-20">
        <ClipLoader color="#000000" loading={true} size={100} className="" />
      </div>
    );
  }

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className="flex flex-col col-start-1 col-end-4 gap-y-5 bg-white rounded-2xl p-10 items-center h-fit">
      <img
        className="rounded-full h-40 w-40 object-cover"
        src={`http://localhost:5554/${data.avatarUrl}`}
      />
      <div className="font-bold text-2xl mb-10">{data.fullName}</div>
      <Link to="/">
        <Button
          onclick={() => onClickLogout()}
          classes="px-5 flex gap-x-2 items-center"
        >
          <BiExit />
          Выйти
        </Button>
      </Link>
    </div>
  );
};

export default UserBar;
