import { useState } from "react";
import Sidebar from "./Sidebar";


function Dashboard(){
    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 w-255     h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4">Dashboard</span>
            </div>
        </div>
    );
};

export default Dashboard;