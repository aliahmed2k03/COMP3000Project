import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useItemContext } from "./ItemContext";

function Dashboard(){
    const navigate= useNavigate();
    const {houses,addHouse,removeHouse, loadUserHouses} = useItemContext();
    const [overlay,setOverlay] = useState(false);
    const [zooplaUrl,setZooplaUrl] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [selectedHouse,setSelectedHouse] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username && houses.length === 0) {
          loadUserHouses(username);
        }
    }, []);

    const fetchListings = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const username = localStorage.getItem("username")
            const response = await axios.post("http://localhost:5000/scrapeZoopla", { url });
            const houseData = response.data;
            await axios.post("http://localhost:5000/addHouse",{
                username, house: houseData
            });  
            addHouse(houseData);
            setOverlay(false);
        } catch (err) {
            console.error("Error fetching house:", err);
            setError("Failed to load house details.");
        }
        setZooplaUrl("");
        setLoading(false);
    }
    const handleDelete = (deletedHouse) =>{
       removeHouse(deletedHouse);
       setSelectedHouse(null)
        
    }
    const handleMap = (house) => {
        navigate(`/Location?address=${encodeURIComponent(house.address)}`);
    };
    return (    
        <div className=" bg-gray-100 h-screen w-screen">
            <div className="bg-gray-100 h-1"></div>
            <Sidebar />
            <div className="fixed top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="fixed left-63 text-black font-bold text-4xl top-2.6 cursor-default">Dashboard</span>
                <button className="fixed right-8 top-5 !bg-[#01A78B]  text-white px-4 py-2 rounded-lg shadow-md hover:!bg-[#01876D] transition" onClick={() => setOverlay(true) }>Add House</button>
            </div>
            <div className="grid grid-cols-3 gap-6 px-60 mt-22">
                {houses.map((house, index) => (
                    <div key={index} className="flex flex-col bg-white shadow-lg rounded-2xl p-5" onClick={()=> setSelectedHouse(house)}>
                        <img src={house.imageUrl} alt="House" className="max-w-full h-45 rounded-xl shadow-md"/>
                        <div className="flex-grow"></div>
                        <span className="text-2xl text-center py-5 text-gray-500 font-bold">{house.address}</span>
                        <div className="flex-grow"></div>
                        <span className="text-2xl text-center py-1 text-black">{house.beds}</span>
                        <span className="text-2xl text-center py-1 text-black">{house.baths}</span>
                        <div className="flex-grow"></div>
                        <span className="text-3xl font-bold text-center py-4 text-black">{house.estate}</span>
                        <div className="flex-grow"></div>
                        <span className="text-3xl mt-1 text-center py-5 text-black">{house.price}</span>
                    </div>
                ))}
            </div>
            {overlay && (
                <div className="fixed inset-0 bg-white/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h2 className="text-2xl font-bold text-center mb-4">Enter Zoopla URL</h2>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg mb-4" placeholder="Paste Zoopla listing URL here..." value={zooplaUrl} onChange={(e) => setZooplaUrl(e.target.value)}/>
                        <div className="flex justify-between">
                            <button className="!bg-red-500 hover:!bg-red-600 text-white px-4 py-2 rounded-lg transition-all" onClick={() => setOverlay(false)}>Cancel</button>
                            <button className="!bg-[#01A78B] hover:!bg-[#01876D] text-white px-4 py-2 rounded-lg transition-all" onClick={() => fetchListings(zooplaUrl)}> {loading ? "Fetching..." : "Add House"}  </button>
                        </div>
                        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    </div>
                </div>
            )}
            {selectedHouse && (
                <div className="fixed inset-0 bg-white/50 flex justify-center items-center" onClick={() => setSelectedHouse(false)}>
                    <div className="bg-white p-6 rounded-lg shadow-xl w-250 h-150 flex flex-col items-start"  onClick={(e) => e.stopPropagation()}>
                        <img src={selectedHouse.imageUrl} alt="House" className="max-w-full h-70 rounded-xl shadow-md"/>
                        <div className="flex-grow"></div>
                        <span className="text-2xl text-center py-5 text-gray-500 font-bold">{selectedHouse.address}</span>
                        <div className="flex-grow"></div>
                        <span className="text-2xl text-center py-1 text-black">{selectedHouse.beds}</span>
                        <span className="text-2xl text-center py-1 text-black">{selectedHouse.baths}</span>
                        <div className="flex-grow"></div>
                        <span className="text-3xl font-bold text-center py-4 text-black">{selectedHouse.estate}</span>
                        <div className="flex-grow"></div>
                        <span className="text-3xl mt-1 text-center py-4 text-black">{selectedHouse.price}</span>
                        <span className="text-3xl mt-1 absolute top-20 right-120 py-4 text-blue-600 hover:underline" onClick={()=> window.open(selectedHouse.url,"_blank","noreferrer")}>Go to Zoopla</span>
                        <span className="text-3xl mt-1 absolute top-40 right-118 py-4 text-blue-600 hover:underline" onClick={() => handleMap(selectedHouse)}>Show on Map</span>
                        <button className="!bg-red-500 hover:!bg-red-600 absolute top-[80%] right-75 text-white px-4 py-2 rounded-lg transition-all" onClick={()=> handleDelete(selectedHouse)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;