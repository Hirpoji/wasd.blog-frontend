import React, { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

interface BurgerMenu {
  options: React.ReactNode[];
}

const BurgerMenu: FC<BurgerMenu> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-10">
      <button
        className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
        onClick={toggleMenu}
      >
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul className="py-2 flex flex-col justify-center">
            {options.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
