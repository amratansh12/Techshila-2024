import React from "react";
import logo from "../images/health.svg";
import { AlignRight } from "lucide-react";

const Navbar = () => {
  const handleToggle = () => {};
  return (
    <div className="bg-soft-black p-3 md:px-6 flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <div className="bg-light-gray rounded-full p-1">
          <img
            className="h-[30px] w-[30px] bg-blend-screen"
            src={logo}
            alt="Logo"
          />
        </div>
        <p className="text-light-gray font-bold text-xl">MedFlow</p>
      </div>
      <div className="hidden md:flex justify-center items-center gap-2 md:gap-6 list-none text-md">
        <li className="text-light-gray cursor-pointer hover:bg-dark-gray px-1 rounded-md">
          Dashboard
        </li>
        <li className="text-light-gray cursor-pointer hover:bg-dark-gray px-1 rounded-md">
          Inventory
        </li>
        <li className="text-light-gray cursor-pointer hover:bg-dark-gray px-1 rounded-md">
          Workers
        </li>
        <li className="text-light-gray cursor-pointer hover:bg-dark-gray px-1 rounded-md">
          Orders
        </li>
        <li className="text-light-gray cursor-pointer hover:bg-dark-gray px-1 rounded-md">
          Analytics
        </li>
      </div>
      <div className="hover:bg-dark-gray p-2 rounded-full md:hidden relative">
        <AlignRight
          onClick={handleToggle}
          className="h-5 w-5 cursor-pointer text-light-gray"
        />
      </div>
    </div>
  );
};

export default Navbar;
