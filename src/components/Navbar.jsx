import React from "react";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header>
      <div className="w-full h-16 backdrop-blur-3xl shadow-[0px_2px_36px_0px_rgba(0,0,0,0.08)] flex justify-between items-center px-5 md:px-14 lg:px-20">
        {isHome ? (
          <div className="w-5 h-5 lg:w-6 lg:h-6"></div>
        ) : (
          <Link to='/'><ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900 cursor-pointer" /></Link>
        )}
        <h1 className="font-medium lg:text-lg text-neutral-700">
          Sentence Construction
        </h1>
        <EllipsisVertical className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900 cursor-pointer" />
      </div>
    </header>
  );
}

export default Navbar;
