import { FC } from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import BurgerMenu from "./MenuBurger";

const Auth: FC = () => {
  const options = [
    <Link to="/login">
      <Button onclick={() => {}} classes="p-5">Войти</Button>
    </Link>,
    <Link to="/registration">
      <Button onclick={() => {}} classes="p-5">
        Регистрация
      </Button>
    </Link>,
  ];

  return (
    <div className={`col-start-10 col-end-13`}>
      <div className="items-center gap-x-10 justify-end hidden lg:flex ">
        <Link to="/login">
          <Button onclick={() => {}}>Войти</Button>
        </Link>
        <Link to="/registration">
          <Button onclick={() => {}} classes="!bg-black text-white px-5">
            Регистрация
          </Button>
        </Link>
      </div>
      <div className="items-center flex gap-x-10 justify-end lg:hidden">
        <BurgerMenu options={options} />
      </div>
    </div>
  );
};

export default Auth;
