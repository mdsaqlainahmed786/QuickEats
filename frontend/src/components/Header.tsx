import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="flex justify-center w-full bg-gray-100 border-b shadow-sm py-2">
        <div className="flex w-full max-w-[90vw] justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-red-500">Deliver</span>
          </div>
          <div className="flex gap-2 text-red-500">
            <Link to="/sign-up">
              <span className="cursor-pointer">SignUp</span>
            </Link>
            <Link to="/sign-in">
              <span className="cursor-pointer">SignIn</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
