import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { AdminSidebar } from './adminSidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const AdminLayout = () => {

    

    const [isSidebarOpen,setSideBarOpen] = useState(false)
    const toggleSidebar = ()=>{
        setSideBarOpen(!isSidebarOpen)
    }
  return (
    <div className='min-h-screen relative flex  flex-col   md:flex-row'>

        {/* mobile screen  */}
        <div className='md:hidden  flex bg-black text-white p-4 z-20'>
            <button onClick={toggleSidebar} className='hover:cursor-pointer'>
                 <FaBars size={24}/> 
            </button>

            <h2 className='ml-4 text-xl font-medium'>
                Admin Dashboard
            </h2>
            
        </div>

        
        {/* overlay for mobile sidebar */}

        {isSidebarOpen &&  (

        <div className='fixed bg-black z-10 inset-0 bg-opacity-50 md:hidden'>
            
             
          </div>
        )}

        <div className={` bg-gray-900 min-h-screen w-64 md:translate-x-0 absolute md:static z-20 transition-transform text-white ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} duration-300 `}>
            <AdminSidebar  />

        </div>

        <div className='flex-grow p-6 overflow-auto'>
            <Outlet/>
        </div>




        

    </div>
  )
}

