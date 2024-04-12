import React, { useEffect, useState } from "react";

import logo from "../images/health.svg";

import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingCart, User } from "lucide-react";
import { useUser } from "../store/user-info";
import { Popover } from "antd";
import Cart from "./Cart";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser((state) => state);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(`/u/${user.name}`)) {
      setIsProfileOpen(true);
    }
  }, [location]);

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

      {localStorage.getItem("token") &&
        localStorage.getItem("token") !== null && (
          <div className="flex gap-4 items-center justify-center">
            {!isProfileOpen ? (
              <>
                <Popover placement="bottom" title={"Shopping cart"} content={<Cart />}>
                  <ShoppingCart size={36} className="cursor-pointer text-light-gray" />
                </Popover>
                <input type="text" placeholder="Search" className="flex gap-1 w-full rounded-full py-1 px-2 hover:bg-dark" />
                <div
                  onClick={() => navigate(`/u/${user.name}`)}
                  className="flex gap-1 hover:bg-dark-gray p-2 rounded-full cursor-pointer"
                >
                  <User className="h-5 w-5 text-light-gray" />
                  <p className="hidden md:block text-sm text-light-gray">
                    Profile
                  </p>
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  navigate("/");
                  setIsProfileOpen(false);
                }}
                className="flex gap-1 hover:bg-dark-gray p-2 rounded-full cursor-pointer"
              >
                <Home className="h-5 w-5 text-light-gray" />
                <p className="hidden md:block text-sm text-light-gray">Home</p>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default Navbar;
