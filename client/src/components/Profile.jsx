import React, { useEffect, useState } from "react";
import {
  SquareMenu,
  UsersRound,
  ShoppingCart,
  ListOrdered,
  LineChart,
  LocateFixed,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../store/user-info";

const sidebarOptions = [
  {
    type: "CEO",
    list: [
      { label: "Dashboard", Icon: <SquareMenu className="h-4 w-4" /> },
      { label: "Workers", Icon: <UsersRound className="h-4 w-4" /> },
      { label: "Inventory", Icon: <ShoppingCart className="h-4 w-4" /> },
    ],
  },
  {
    type: "Store Manager",
    list: [
      { label: "Dashboard", Icon: <SquareMenu className="h-4 w-4" /> },
      { label: "Inventory", Icon: <ShoppingCart className="h-4 w-4" /> },
      { label: "Orders", Icon: <ListOrdered className="h-4 w-4" /> },
      { label: "Order Status", Icon: <LineChart className="h-4 w-4" /> },
    ],
  },
  {
    type: "User",
    list: [
      { label: "Dashboard", Icon: <SquareMenu className="h-4 w-4" /> },
      { label: "Orders", Icon: <ListOrdered className="h-4 w-4" /> },
      { label: "Order Status", Icon: <LineChart className="h-4 w-4" /> },
      { label: "Nearest stores", Icon: <LocateFixed className="h-4 w-4" /> },
    ],
  },
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const { user, setUser } = useUser((state) => state);
  const [component, setComponent] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      setUser(user);

      const filteredOptions = sidebarOptions.filter(
        (item) => item.type === user.role
      );
      setOptions(filteredOptions[0].list);
    }
  }, [setUser]);

  useEffect(() => {
    setComponent(location.pathname.split("/")[3]);
    console.log(component);
  }, [location, component]);

  const listComponent = () => {
    switch (component) {
      case "Dashboard":
        return <h1 className="text-light-gray font-bold text-xl">Dashboard</h1>;
      case "Workers":
        return <h1 className="text-light-gray font-bold text-xl">Workers</h1>;
      case "Inventory":
        return <h1 className="text-light-gray font-bold text-xl">Inventory</h1>;
      default:
        return;
    }
  };

  return (
    <div className="flex-1 bg-dark-gray/50 flex">
      <div className="bg-soft-black w-[60px] md:w-[200px] h-full text-light-gray flex flex-col justify-between border-t border-dark-gray">
        <div className="flex flex-col gap-4 mt-4 w-full">
          {options.map((option) => (
            <div
              key={option.label}
              onClick={() => navigate(`/u/${user.name}/${option.label}`)}
              className="hover:bg-dark-gray cursor-pointer flex gap-1 items-center justify-center md:justify-start px-3 py-2 w-full"
            >
              {option.Icon}
              <p className="text-light-gray text-md hidden md:block">
                {option.label}
              </p>
            </div>
          ))}
        </div>
        <div
          onClick={handleLogout}
          className="hover:bg-dark-gray cursor-pointer flex gap-1 items-center justify-center md:justify-start px-3 py-2 border-t border-mid-gray w-full"
        >
          <LogOut className="h-5 w-5 text-rose-500" />
          <p className="text-rose-500 text-md hidden md:block">Logout</p>
        </div>
      </div>
      <div className="p-2">{listComponent()}</div>
    </div>
  );
};

export default Profile;
