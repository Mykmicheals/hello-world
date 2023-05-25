import { useState } from "react";

const SideBar = ({ setIsOpen }: any) => {
  return (
    <div className="relative bg-[#242426] h-screen mx-4 my-2 rounded-lg w-1/5">
      <h3 className="text-white text-center text-2xl font-mono mt-4">Dashboard</h3>
      <div className=" mt-6 mx-5 md:mx-10">
        <p
          className={`text-gray-300 text-sm pointer mb-12 bg-[#E4316F] px-6 rounded-lg py-2 hover:cursor-pointer`}
        >Performance</p>

          <p
          className={`text-gray-300 text-sm pointer mb-12  px-6 rounded-lg py-2 hover:cursor-pointer`}
        >Summary</p>

        
           <p
          className={`text-gray-300 text-sm pointer absolute bottom-28  px-6 rounded-lg py-2 hover:cursor-pointer`}
        >Logout</p>
        
      </div>
    </div>
  );
};

export default SideBar;
