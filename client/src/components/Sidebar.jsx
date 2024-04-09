import React from "react";
import { X } from "lucide-react";
import { useSidebar } from "../store/toggle-sidebar";

const Sidebar = () => {
  const { isOpen, toggleIsOpen } = useSidebar((state) => state);

  const closeSidebar = () => {
    toggleIsOpen(!isOpen);
  };

  return (
    <div className="bg-soft-black absolute right-0 h-full list-none space-y-2">
      <div
        className="text-light-gray top-2 right-2 hover:bg-dark-gray p-1 w-full flex gap-1 justify-center items-center cursor-pointer"
        onClick={closeSidebar}
      >
        <X className="text-rose-600 h-5 w-5" />
      </div>
      <li className="text-light-gray cursor-pointer hover:bg-dark-gray py-1 px-10">
        Dashboard
      </li>
      <li className="text-light-gray cursor-pointer hover:bg-dark-gray py-1 px-10">
        Inventory
      </li>
      <li className="text-light-gray cursor-pointer hover:bg-dark-gray py-1 px-10">
        Workers
      </li>
      <li className="text-light-gray cursor-pointer hover:bg-dark-gray py-1 px-10">
        Orders
      </li>
      <li className="text-light-gray cursor-pointer hover:bg-dark-gray py-1 px-10">
        Analytics
      </li>
    </div>
  );
};

export default Sidebar;
