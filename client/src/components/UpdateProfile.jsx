import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../store/user-info";

const UpdateProfile = () => {
  const { user, setUser } = useUser((state) => state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/v1/auth/updateUser/${user.id}`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            contactNumber,
          }),
        }
      );

      const data = await response.json();

      if (!data) {
        return window.alert("Internal server error, unable to update account");
      }

      if (!data.token) {
        return window.alert("Unable to update user");
      }

      localStorage.setItem("token", data.token);
      const updatedUser = jwtDecode(data.token);
      setUser(updatedUser);
      window.alert("User updated successfully");
      setName("");
      setEmail("");
      setContactNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Update Info
      </p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 py-4 w-full md:w-[300px]"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
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
