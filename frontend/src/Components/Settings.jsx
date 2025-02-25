import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";


function Settings(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");

    useEffect(()=>{
        const storedusername = localStorage.getItem("username")
        if(storedusername){
            setUsername(storedusername)
        }
    },[]);

    function handleLogout(){
        navigate("/login");    
    }

    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Sidebar />
            <div className="absolute top-3 left-60 right-5 h-16 px-6 py-3 bg-white shadow-lg rounded-2xl">
                <span className="absolute text-black font-bold text-4xl top-2.6 left-4 cursor-default">Settings</span>
            </div>
            <div className="flex flex-col justify-center absolute top-23 left-60 w-60 h-120 px-6 py-5 bg-white shadow-lg rounded-2xl">
                <CgProfile className="text-gray-800 self-center" size={"120"}/>
                <span className="text-4xl text-center text-black break-words ">{username}</span>               
                <button type="submit" className="h-10 w-20 mt-60 flex items-center justify-center self-center shadow-lg rounded-md text-white !bg-red-500 hover:!bg-[#f71616] transition" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Settings;