import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useRef } from "react";

function Dashboard(){
    const [scrapedHouse,setScrapedHouse] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() =>{
        if (hasFetched.current) return;
        hasFetched.current = true;
        
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
            <div className="flex flex-col justify-col absolute top-23 left-60 w-120 h-160 px-6 py-5 bg-white shadow-lg rounded-2xl">
                <div className=" flex justify-center text-center ">
                    <img src={scrapedHouse.imageUrl} alt="House" className="max-w-full self-center h-55 rounded-xl shadow-md" />
                </div>
                <span className="text-3xl text-center py-6 text-black break-words ">{scrapedHouse.address}</span>
                <span className="text-2xl text-center py-1 text-black break-words ">{scrapedHouse.beds}</span>
                <span className="text-2xl text-center py-1 text-black break-words ">{scrapedHouse.baths}</span>
                <span className="text-3xl mt-10 text-center font-bold py-4 text-black break-words ">{scrapedHouse.estate}</span>
                <span className="text-3xl mt-3 text-center py-6 text-black break-words ">{scrapedHouse.price}</span>  
            </div>
        </div>
    );
};

export default Dashboard;