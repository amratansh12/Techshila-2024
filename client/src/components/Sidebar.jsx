import React from "react";
import { CircleX } from "lucide-react";
import { useSidebar } from "../store/toggle-sidebar";

const Sidebar = () => {
  const { isOpen } = useSidebar((state) => state);
  return (
    <div className="bg-soft-black absolute right-0 h-full px-2 py-6 list-none space-y-3 border-l border-mid-gray">
      <div className="absolute text-light-gray top-2 left-2">
        <CircleX className="hover:text-mid-gray cursor-pointer" />
      </div>
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
  );
};

export default Sidebar;
