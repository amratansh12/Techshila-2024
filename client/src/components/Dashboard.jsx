import React from "react";
import { useUser } from "../store/user-info";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser((state) => state);
  const { name, email, role, contactNumber } = user;

  const handleClick = (target) => {
    navigate(`/u/${name}/${target}`);
  };

  return (
    <div className="w-full h-full">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Dashboard
      </p>
      <div className="mt-2 border-b border-light-gray">
        <p className="text-light-gray my-2 text-xl">
          <span className="font-bold mr-1 text-cyan-600">Name:</span>
          <span>{name}</span>
        </p>
        <p className="text-light-gray my-2 text-xl">
          <span className="font-bold mr-1 text-cyan-600">Email:</span>
          <span>{email}</span>
        </p>
        <p className="text-light-gray my-2 text-xl">
          <span className="font-bold mr-1 text-cyan-600">Role:</span>
          <span className="text-rose-500">{role}</span>
        </p>
        <p className="text-light-gray my-2 text-xl">
          <span className="font-bold mr-1 text-cyan-600">Contact Number:</span>
          <span className="text-rose-500">{contactNumber}</span>
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleClick("Order")}
          className="px-3 py-2 rounded-md bg-soft-black font-bold hover:bg-soft-black/70 mx-2 text-light-gray"
        >
          Order online
        </button>
        <button
          onClick={() => handleClick("Order%20Status")}
          className="px-3 py-2 rounded-md bg-soft-black font-bold hover:bg-soft-black/70 mx-2 text-light-gray"
        >
          Check your orders
        </button>
        <button
          onClick={() => handleClick("Nearest%20Stores")}
          className="px-3 py-2 rounded-md bg-soft-black font-bold hover:bg-soft-black/70 mx-2 text-light-gray"
        >
          Visit our nearest stores
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
