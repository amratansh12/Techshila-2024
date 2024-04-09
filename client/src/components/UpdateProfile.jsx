import React, { useState } from "react";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="mt-2 py-3">
      <p className="text-2xl font-bold text-light-gray">Update Info</p>
      <form
        action="submit"
        className="flex flex-col gap-2 py-4 w-full md:w-[300px]"
      >
        <input
          type="text"
          placeholder="Name"
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Email"
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Contact Number"
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <button className="bg-soft-black hover:bg-soft-black/70 text-light-gray cursor-pointer px-2 py-1 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
