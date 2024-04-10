import React, { useEffect, useState } from "react";
import { useUser } from "../store/user-info";
import { jwtDecode } from "jwt-decode";
import StoreManager from "./StoreManager";

const Home = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== null
    ) {
      const token = localStorage.getItem("token");
      const data = jwtDecode(token);
      setUserRole(data.role);
    }
  }, []);

  return (
    <div className="flex-1 bg-dark-gray/50 text-white flex justify-center items-center">
      {userRole === "CEO" && (
        <div className="bg-soft-black p-6 w-auto rounded-lg border border-mid-gray flex justify-center items-center">
          <p className="text-xl text-light-gray font-bold text-center my-4">
            Please check your profile to accesss information about your workers
            and inventory
          </p>
        </div>
      )}
      {userRole === "Store Manager" && <StoreManager />}
      {userRole === "User" && (
        <div className="bg-soft-black p-6 rounded-md aspect-square border border-mid-gray">
          <p className="text-xl text-light-gray font-bold text-center my-4">
            {userRole}
            Search your Meds
          </p>
          <input
            type="text"
            placeholder="Search for your medicine"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
