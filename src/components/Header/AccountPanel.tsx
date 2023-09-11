import { FC } from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../../types";
import BurgerMenu from "./MenuBurger";

const AccountPanel: FC = () => {
  const { data } = useSelector((state: UserState) => state.auth);

  const options = [
    <Link to="/addpost">
      <Button classes="p-5">Новая статья</Button>
    </Link>,
    <Link to="/user">
      <Button classes="p-5">
        Профиль
      </Button>
    </Link>,
  ];

  return (
    <div className={`col-start-9 col-end-13`}>
      <div className="items-center gap-x-10 justify-end hidden lg:flex ">
        <Link to="/addpost">
          <Button classes="!bg-black text-white p-5">Новая статья</Button>
        </Link>
        <Link to="/user">
          <Button classes="flex gap-x-4">
            <span className="font-bold">{data.fullName}</span>
            <img
              src={`http://localhost:5554/${data.avatarUrl}`}
              className="w-10 h-10 object-cover rounded-full"
            />
          </Button>
        </Link>
      </div>
      <div className="items-center flex gap-x-10 justify-end lg:hidden">
        <BurgerMenu options={options} />
      </div>
    </div>
  );
};

export default AccountPanel;
