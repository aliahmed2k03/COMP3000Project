import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useRef } from "react";
import { useItemContext } from "./ItemContext";

function Dashboard(){
    const {houses,addHouse} = useItemContext();
    const [overlay,setOverlay] = useState(false);
    const [zooplaUrl,setZooplaUrl] = useState("");
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const fetchListings = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:5000/scrapeZoopla", { url });
            addHouse(response.data);
            setOverlay(false);
        } catch (err) {
            console.error("Error fetching house:", err);
            setError("Failed to load house details.");
        }
        setLoading(false);
    }
    return (
        <div className="  bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4 cursor-default">Dashboard</span>
                <button className="absolute right-6 top-2 !bg-[#01A78B]  text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#01876D]" onClick={() => setOverlay(true)}>Add House</button>
            </div>
            <div className="grid grid-cols-3 gap-6 px-60 mt-50">
                {houses.map((house, index) => (
                    <div key={index} className="flex flex-col bg-white shadow-lg rounded-2xl p-5">
                        <img src={house.imageUrl} alt="House" className="max-w-full h-55 rounded-xl shadow-md"/>
                        <span className="text-3xl text-center py-6 text-black">{house.address}</span>
                        <span className="text-2xl text-center py-1 text-black">{house.beds}</span>
                        <span className="text-2xl text-center py-1 text-black">{house.baths}</span>
                        <span className="text-3xl font-bold text-center py-4 text-black">{house.estate}</span>
                        <span className="text-3xl mt-1 text-center py-6 text-black">{house.price}</span>
                    </div>
                ))}
            </div>
            {overlay && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-2xl font-bold text-center mb-4">Enter Zoopla URL</h2>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg mb-4" placeholder="Paste Zoopla listing URL here..." value={zooplaUrl} onChange={(e) => setZooplaUrl(e.target.value)}/>
                        <div className="flex justify-between">
                            <button className="!bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setOverlay(false)}>Cancel</button>
                            <button className="!bg-[#01A78B] text-white px-4 py-2 rounded-lg" onClick={() => fetchListings(zooplaUrl)}>Fetch</button>
                        </div>
                        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;