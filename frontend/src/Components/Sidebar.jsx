import React from 'react'
import { IoMdGlobe } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

export const Sidebar = () => {
  return (
    <div className='fixed top-20 left-0 h-screen w-55 flex flex-col bg-gray-900 text-white'>
        <ul>
            <li className=' group fixed top-29 left-17 text-2xl hover:text-[#01A78B] transition'>
             <IoMdHome className='fixed left-8 top-29 text-white group-hover:text-[#01A78B] transition ' size={"29"}/>
              Dashboard
              </li>
            <li className='group fixed top-43 left-17 text-2xl hover:text-[#01A78B] transition'>
              <IoMdGlobe className='fixed left-8 top-43 text-white group-hover:text-[#01A78B] transition ' size={"29"}/>
              Location
              </li>
            <li className='group fixed top-130 left-17 text-2xl hover:text-[#01A78B] transition'>
              <IoMdSettings className='fixed left-8 top-130 text-white group-hover:text-[#01A78B] transition ' size={"29"}/>
              Settings
              </li>
        </ul>
        <div className='fixed top-0 left-0 h-20 w-55 bg-[#01A78B]'>
            <span className='fixed top-4 left-4 text-5xl text-white font-bold'>Vantage</span>
        </div>
    </div>
  )
}

const SidebarIcon = ({icon}) =>(
  <div className='text-white'>
    {icon}
  </div>
)


export default Sidebar;
