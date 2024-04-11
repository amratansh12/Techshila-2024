import React, { useEffect, useState } from "react";

const JoinStore = () => {
  const [storeId, setStoreId] = useState("");
  const [allStores, setAllStores] = useState([]);

  useEffect(() => {
    const getStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/v1/store/getStores",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const stores = await response.json();

        if (!stores) {
          return console.log("Unable to process store info");
        }

        setAllStores(stores.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStores();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (storeId) {
      console.log("STORE ID:--", storeId);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <p className="text-xl font-semibold text-center my-2 text-light-gray">
        Join a Store
      </p>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3"
      >
        <select
          type="text"
          onChange={(e) => setStoreId(e.target.value)}
          placeholder="Join Store"
          className="bg-light-gray text-soft-black focus:ring-0 focus:outline-0 px-1 py-1 rounded-sm text-sm w-[50%]"
        >
          <option value="Enter store id" defaultChecked>
            Enter Store ID
          </option>
          {allStores.length > 0 &&
            allStores.map((storeItem) => (
              <option key={storeItem} value={storeItem} defaultChecked>
                {storeItem}
              </option>
            ))}
        </select>

        <button className="bg-mid-gray w-[50%] hover:bg-mid-gray/60 cursor-pointer px-2 rounded-md text-light-gray">
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinStore;
