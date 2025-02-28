import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';


function Dashboard(){
    const [scrapedHouse,setScrapedHouse] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() =>{
        axios.get("http://localhost:5000/scrapeZoopla")
        .then(response =>{
            setScrapedHouse(response.data);
            setLoading(false);
        })
        .catch(err =>{
            console.error("error", err);
            setError("Failed to load house");
            setLoading(false);
        })
    },[]);

    if (loading) return<p>loading house details...</p>;
    if (error) return <p>{error}</p>
    return (
        <div className="  bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4 cursor-default">Dashboard</span>
            </div>
            <div className="flex flex-col justify-center absolute top-23 left-60 w-60 h-120 px-6 py-5 bg-white shadow-lg rounded-2xl">
            <span className="text-2x1 text-center py-4 text-black break-words ">{scrapedHouse.address}</span>
            <span className="text-2x1 text-center py-4 text-black break-words ">{scrapedHouse.beds}</span>
            <span className="text-2x1 text-center py-4 text-black break-words ">{scrapedHouse.baths}</span>
            <span className="text-2x1 text-center py-4 text-black break-words ">{scrapedHouse.estate}</span>
            <span className="text-2x1 text-center py-4 text-black break-words ">{scrapedHouse.price}</span>  
            </div>
        </div>
    );
};

export default Dashboard;