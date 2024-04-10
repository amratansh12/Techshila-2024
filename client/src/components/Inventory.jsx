import React, { useEffect, useState } from "react";
import { useAddItemModal } from "../store/toggle-modal";

const Inventory = () => {
  const { toggleIsAddItemOpen } = useAddItemModal((state) => state);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const getAllInventories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/v1/inventory/getInventories",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const inventories = await response.json();

        if (!inventories) {
          return window.alert(
            "Unable to fetch inventories, Internal servor error"
          );
        }

        setInventory(inventories.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllInventories();
  }, []);
  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
        Inventory
      </p>
      {!inventory && (
        <div className="w-full flex-1 text-lg flex justify-center items-center text-light-gray">
          Your inventory is empty
        </div>
      )}
      <div className="py-2 border-t border-light-gray">
        <button
          onClick={toggleIsAddItemOpen}
          className="bg-soft-black hover:bg-soft-black/60 px-2 py-1 rounded-md text-light-gray font-bold"
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default Inventory;
