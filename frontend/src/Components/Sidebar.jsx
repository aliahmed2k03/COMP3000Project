import React from 'react'

export const Sidebar = () => {
  return (
    <div className='fixed top-20 left-0 h-screen w-55 flex flex-col bg-gray-900 text-white font-bold'>
        <ul>
            <li className='fixed top-29 left-17 text-2xl'>Dashboard</li>
            <li className='fixed top-43 left-17 text-2xl'>Location</li>
            <li className='fixed top-130 left-17 text-2xl'>Settings</li>
        </ul>
        <div className='fixed top-0 left-0 h-20 w-55 bg-[#01A78B]'>
            <span className='fixed top-4 left-4 text-5xl text-white font-bold'>Vantage</span>
        </div>
    </div>
  )
}



export default Sidebar;
