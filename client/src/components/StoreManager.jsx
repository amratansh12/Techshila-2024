import React from "react";
import { useUser } from "../store/user-info";

const StoreManager = () => {
  return (
    <div className="bg-soft-black p-6 w-auto rounded-lg border border-mid-gray flex justify-center items-center">
      <p className="text-lg text-light-gray font-bold text-center my-4">
        Please check your profile to accesss information about your workers and
        inventory
      </p>
    </div>
  );
};

export default StoreManager;
