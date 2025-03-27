import React from 'react'
import { IoMdGlobe } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  function handleLocation(){
    navigate("/Location")
  }

  function handleSettings() {
    navigate("/Settings")
  }
  
  function handleDashboard(){
    navigate("/Dashboard")
  }

  return (
    <div className='fixed top-20 left-0 h-screen w-55 flex flex-col bg-gray-900 text-white'>
        <ul>
            <li className=' group fixed top-[17%] left-17 text-2xl hover:text-[#01A78B] transition cursor-pointer' onClick={handleDashboard}>
             <IoMdHome className='fixed left-8 top-[17%] text-white group-hover:text-[#01A78B] transition ' size={"29"}/>
              Dashboard
              </li>
            <li className='group fixed top-[25%] left-17 text-2xl hover:text-[#01A78B] transition cursor-pointer' onClick={handleLocation}>
              <IoMdGlobe className='fixed left-8 top-[25%] text-white group-hover:text-[#01A78B] transition ' size={"29"}/>
              Locations
              </li>
            <li className='group fixed top-[93%] left-17 bottom-10 text-2xl hover:text-[#01A78B] transition cursor-pointer' onClick={handleSettings}>
              <IoMdSettings className='fixed left-8 top-[93%] text-white group-hover:text-[#01A78B] transition ' size={"29"}/>
              Settings
              </li>
        </ul>
        <div className='fixed top-0 left-0 h-20 w-55 bg-[#01A78B]'>
            <span className='fixed top-4 left-4 text-5xl text-white font-bold cursor-default'>Vantage</span>
        </div>
    </div>
  )
}


export default Sidebar;
