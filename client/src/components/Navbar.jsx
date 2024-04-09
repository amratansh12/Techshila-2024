import React, { useEffect, useState } from "react";

import logo from "../images/health.svg";

import { useNavigate, useLocation } from "react-router-dom";
import { Home, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/u/1")) {
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
              <div
                onClick={() => navigate(`/u/${1}`)}
                className="flex gap-1 hover:bg-dark-gray p-2 rounded-full cursor-pointer"
              >
                <User className="h-5 w-5 text-light-gray" />
                <p className="hidden md:block text-sm text-light-gray">
                  Profile
                </p>
              </div>
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
