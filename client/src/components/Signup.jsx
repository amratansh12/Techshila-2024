import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, email, password, confirmPassword);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    if (password !== confirmPassword) {
      return window.alert("Enter matching passwords");
    }

    navigate("/home");
  };

  return (
    <div className="flex-1 bg-dark-gray/50 flex justify-center items-center">
      <div className="bg-soft-black p-6 rounded-md aspect-square border border-mid-gray">
        <p className="text-lg font-bold text-light-gray text-center my-5">
          SIGNUP
        </p>
        <form
          action="submit"
          className="flex flex-col gap-2 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <button className="bg-dark-gray hover:bg-dark-gray/80 text-light-gray px-2 py-1 rounded-sm w-full my-5">
            Signup
          </button>
        </form>
        <p className="text-light-gray text-sm text-center">
          Already have an account? Login{" "}
          <Link className="text-cyan-600" to="/login">
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
