import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <Link to="/" className={`col-start-1 col-end-4`}>
      <div className="items-center gap-x-5 flex">
        <h1 className="text-3xl font-bold">WASD.blog</h1>
      </div>
    </Link>
  );
};

export default Logo;
