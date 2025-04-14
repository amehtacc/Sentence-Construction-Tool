import React from "react";
import { ArrowLeft, EllipsisVertical } from "lucide-react";

function Navbar() {
  return (
    <header className="hidden md:flex">
      <div
        className="w-full h-16 backdrop-blur-3xl shadow-[0px_2px_36px_0px_rgba(0,0,0,0.08)] flex justify-between items-center md:px-14 lg:px-20">
        <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900" />
        <h3 className="font-medium lg:text-lg text-neutral-700">
          Sentence Construction
        </h3>
        <EllipsisVertical className="w-5 h-5 lg:w-6 lg:h-6 text-neutral-900" />
      </div>
    </header>
  );
}

export default Navbar;
