import { FC } from "react";
import Logo from "./Logo";
import Auth from "./Auth";
import AccountPanel from "./AccountPanel";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/Slices/auth";

const Header: FC = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="mb-10">
      <div className="items-center grid grid-cols-12">
        <Logo />
        {isAuth ?   <AccountPanel /> : <Auth /> }
      </div>
    </div>
  );
};

export default Header;
