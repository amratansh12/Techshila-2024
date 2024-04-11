import { useEffect, useState } from "react";
import LocationSelectorMap from "../components/StoreLocation/LocationSelector";

const ViewStore = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/api/v1/store/getStores`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        ).then((response) => response.json());
        setStores(response.data.stores);
        console.log(response.data.stores);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="h-full w-full">
      {loading && <div>Loading...</div>}{" "}
      {!loading && (
        <div className="flex flex-col">
          <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
            Stores
          </p>
          {stores && stores.length > 0 && (
            <div className="grid grid-cols-4 gap-4 py-4 overflow-y-scroll">
              {stores?.map((store) => (
                <div
                  key={store.id}
                  className="bg-mid-gray p-2 rounded-md border border-dark-gray shadow-sm shadow-dark-gray text-light-gray flex flex-col gap-1"
                >
                  <p className="text-lg font-semibold">{store.name}</p>
                  <p className="text-md">Address: {store.address}</p>
                  <p className="text-md">Contact: {store.contactNumber}</p>
                  <div className="w-full aspect-square">
                    <LocationSelectorMap
                      onLocationSelected={() => {}}
                      DEFAULT_POSITION={store.location}
                      styles={"w-full aspect-square"}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!stores.length > 0 && (
            <div className="flex-1 flex justify-center items-center w-full">
              <p className="text-lg text-center text-light-gray">
                You are not a part of any store. Kindly join a store.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ViewStore;
