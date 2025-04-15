import React from "react";
import { Link } from "react-router-dom";
import { Icon_1 } from "../../public/icons/images";

function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-[330px]:w-[280px] min-[330px]:w-[350px] sm:w-[550px] lg:w-[627px] flex flex-col justify-center items-center gap-20 md:gap-16">
        <div className="flex flex-col gap-20 lg:gap-24">
          <div className="flex flex-col justify-center items-center gap-8">
            <img
              className="w-[72px] h-[72px]"
              src={Icon_1}
              alt="Write Icon"
            />
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="font-semibold text-2xl md:text-3xl lg:text-[40px] text-center text-neutral-900">
                Sentence Construction
              </h2>
              <p className="font-normal text-sm md:text-base lg:text-xl text-center text-neutral-500">
                Select the correct words to complete the sentence by arranging
                the provided options in the right order.
              </p>
            </div>
          </div>
          <div className="font-medium flex justify-center items-center text-center md:gap-6 lg:gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-medium md:text-lg lg:text-xl text-neutral-800">
                Time Per Question
              </p>
              <p className="text-sm md:text-base lg:text-lg text-neutral-500">30 sec</p>
            </div>

            <hr className="max-[330px]:w-[100px] min-[330px]:w-[54px] border-[1px] border-neutral-200 rotate-90" />

            <div className="flex flex-col gap-4">
              <p className="font-medium md:text-lg lg:text-xl text-neutral-800">
                Total Questions
              </p>
              <p className="text-sm md:text-base lg:text-lg text-neutral-500">10</p>
            </div>

            <hr className="w-[90px] sm:w-[54px] border-[1px] hidden md:flex border-neutral-200 rotate-90" />

            <div className="hidden md:flex flex-col gap-4">
              <p className="font-medium md:text-lg lg:text-xl text-neutral-800">
                Coins
              </p>
              <div className="flex justify-center items-center gap-1">
                <div className="w-4 h-4 rotate-y-animation rounded-full bg-[rgba(255,215,0,1)] border-2 border-[rgba(245,206,0,1)]"></div>
                <p className="md:text-base lg:text-lg text-neutral-500">20</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center items-center gap-4">
          <button className="w-[120px] h-[36px] lg:w-[140px] lg:h-[42px] text-[rgba(69,63,225,1)] font-medium flex justify-center items-center rounded-lg py-2.5 px-6 cursor-pointer border-[1px] border-[rgba(69,63,225,1)] bg-white hover:bg-gray-100 transition-all duration-200">
            Back
          </button>
          <button className="w-[120px] h-[36px] lg:w-[140px] lg:h-[42px] font-medium flex justify-center items-center rounded-lg py-2.5 px-6 cursor-pointer text-white bg-[rgba(69,63,225,1)] hover:bg-[rgba(69,63,225,1)]/90 transition-all duration-200">
            <Link to='/quiz'>Start</Link>
          </button>
          <div className="absolute top-12 left-40 hidden max-md:flex justify-center items-center gap-2">
            <div className="w-4 h-4 rotate-y-animation rounded-full bg-[rgba(255,215,0,1)] border-2 border-[rgba(245,206,0,1)]"></div>
            <p className="text-xs font-medium text-neutral-500">20 coins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
