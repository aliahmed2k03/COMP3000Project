import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useItemContext } from "./ItemContext";
import axios from 'axios';


function Settings(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [confirmation,setConfirmation] = useState(false)

    useEffect(()=>{
        const storedusername = localStorage.getItem("username")
        if(storedusername){
            setUsername(storedusername)
        }
    },[]);

    function handleLogout(){
        navigate("/login");    
    }
    const handleClearDashboard = async () => {
        try {
            console.log("reached");
            await axios.post("http://localhost:5000/clearDashboard", { username });
            toast.success("Dashboard cleared successfully");
        } catch (err) {
            console.error("Error clearing dashboard:", err);
            toast.error("Failed to clear dashboard");
        }
    };

    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4 cursor-default">Settings</span>
            </div>
            <div className="flex flex-col items-center gap-6 absolute top-24 left-60 w-60 px-6 py-8 bg-white shadow-lg rounded-2xl">
                <CgProfile className="text-gray-800" size={"120"} />
                <span className="text-4xl text-center text-black break-words">{username}</span>
                <button type="button" className="h-12 w-45 flex items-center justify-center shadow-lg rounded-md text-white !bg-blue-500 hover:!bg-blue-600 transition" onClick={() => setConfirmation(true)}>Clear Dashboard</button>
                <button type="submit"className="h-10 w-20 mt-15 flex items-center justify-center shadow-lg rounded-md text-white !bg-red-500 hover:!bg-[#f71616] transition"onClick={handleLogout}>Logout</button>
            </div>
            {confirmation && (
                <div className="fixed inset-0 bg-white/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-2xl font-bold text-center mb-4">Are you sure you want to clear your dashboard?</h3>
                        <div className="flex justify-between">
                            <button className="!bg-red-500 hover:!bg-red-600 text-white px-4 py-2 rounded-lg transition-all" onClick={() => setConfirmation(false)}>Cancel</button>
                            <button className="!bg-[#01A78B] hover:!bg-[#01876D] text-white px-4 py-2 rounded-lg transition-all" onClick={() =>{console.log("clicked"); handleClearDashboard(); setConfirmation(false)}}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>  
        
    );
};

export default Settings;