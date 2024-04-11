import React, { useState } from "react";
import { useAddItemModal } from "../store/toggle-modal";
import { X } from "lucide-react";

const AddItemModal = () => {
  const { toggleIsAddItemOpen } = useAddItemModal((state) => state);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen bg-black/50 absolute flex justify-center items-center">
      <div className="bg-mid-gray border border-soft-black rounded-lg relative">
        <button
          onClick={toggleIsAddItemOpen}
          className="absolute hover:text-rose-600 text-white right-1 top-1"
        >
          <X className="h-5 w-5" />
        </button>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-2 items-center p-6"
        >
          <p className="font-bold text-soft-black text-xl">Add Item</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-2 py-1 rounded-sm placeholder:text-mid-gray placeholder:text-sm"
          />
          <button className="bg-soft-black hover:bg-soft-black/60 px-2 py-1 rounded-md text-light-gray w-full">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
