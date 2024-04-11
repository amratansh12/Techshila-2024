import { useEffect, useState } from "react";

const ViewStore = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://localhost:4000/api/v1/store/getStores`,
                    {
                        method: "GET",
                        headers: {
                            authorization: "Bearer " + token,
                            "Content-type": "application/json",
                        }
                    }
                )
                    .then((response) => response.json())
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
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* <div className="w-full h-full"> */}
                        <p className="text-2xl text-light-gray py-2 border-b border-light-gray font-bold">
                            View Store
                        </p>
                        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {stores?.map((store) => (
                                <article key={store.id} className="border-double border-slate-200 rounded-lg border-2 flex max-w-xl flex-col items-start justify-between px-2">
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-600">
                                            <a href={store.name}>
                                                <span className="absolute inset-0" />
                                                {store.name}
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="relative mt-8 flex items-center gap-x-4">
                                        {/* <img src={store.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> */}
                                        <div className="text-sm leading-6">
                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-white-600">{store.address}</p>
                                            <p className="text-gray-600">id: {store._id}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
            )}
                </div>
            );
}
            export default ViewStore;