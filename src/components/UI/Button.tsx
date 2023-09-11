import { FC, MouseEventHandler } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  classes?: string;
  onclick?: MouseEventHandler<HTMLButtonElement>;
  typeButton?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ children, classes, onclick, typeButton }) => {
  return (
    <button
      className={`${classes} border-none py-2 rounded-full font-medium text-base leading-19 flex items-center gap-x-2 bg-transparent`}
      onClick={onclick}
      type={typeButton}
    >
      {children}
    </button>
  );
};

export default Button;
