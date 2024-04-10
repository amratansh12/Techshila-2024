import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../store/user-info";
import LocationSelectorMap from "./StoreLocation/LocationSelector";

const AddStore = () => {
    const { user, setUser } = useUser((state) => state);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    // const [coord, setCoord] = useState({ });
    let coord = {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:4000/api/v1/store/createStore`,
                {
                    method: "POST",
                    headers: {
                        authorization: "Bearer " + token,
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        location,
                        coord,
                        contactNumber,
                    }),
                }
            );
            console.log(JSON.stringify({
                name,
                location,
                coord,
                contactNumber,
            }), "body");
            const data = await response.json();
            console.log(data);
            if (!data) {
                return window.alert("Internal server error, unable to add store");
            }

            if (data.status === "success") {
                return window.alert("Store Added Successfully!");
            }

            setName("");
            setLocation("");
            setContactNumber("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleLocationSelected = async (latlng) => {
        console.log(latlng); // { lat: 51.505, lng: -0.09 }
        // setCoord(latlng);
        coord = latlng;
        // Send the latlng to the backend
        // const response = await fetch('/api/location', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(latlng),
        // });
        // const data = await response.json();
        // console.log(data); // Response from your ba
    }

    return (
        <div className="w-full h-full">
            <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
                Add Store
            </p>
            <div className="flex flex-row gap-5 w-full">

                <form action="submit" className="flex flex-col gap-5 py-4 w-full md:w-[300px]">
                    <input
                        type="text"
                        placeholder="Store Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 my-2 px-2 border border-light-gray"
                    />
                    <input
                        type="text"
                        placeholder="Store Address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-10 my-2 px-2 border border-light-gray"
                    />
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Store Contact Number"
                        className="w-full h-10 my-2 px-2 border border-light-gray"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full h-10 my-2 bg-cyan-600 text-white"
                    >
                        Add Store
                    </button>
                </form>
                <div className="w-full">
                    <h3 className="text-white">Select Store location</h3>
                    <LocationSelectorMap onLocationSelected={handleLocationSelected} />
                </div>
            </div>
        </div>

    )
}

export default AddStore;