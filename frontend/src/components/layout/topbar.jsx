import React from 'react'
import {TbBrandMeta} from "react-icons/tb"
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine}  from "react-icons/ri"
 export const Topbar = () => {
  return (
    <div>
        <div className='bg-red-600 p-2' >
            <div className='container  flex justify-between items-center  mx-auto p-1'>
              <div className='hidden md:flex items-center space-x-4' >
               <a className='hover:text-gray-500' href="#">
                <TbBrandMeta className="h-5 w-5"/>
               </a>
               <a className='hover:text-gray-500' href="#">
                <IoLogoInstagram className="h-5 w-5"/>
               </a>
               <a className='hover:text-gray-500' href="#">
                <RiTwitterXLine className="h-5 w-5"/>
               </a>
            
              </div>
              <div className='text-center text-sm  flex-grow'>
                <span className='uppercase font-semibold'>we ship world wide</span>
              </div>
              <div className='text-sm  hidden md:block '>
                <a className='hover:text-gray-300' href="tel:123456789">
                  +91 123456789
                </a>
              </div>

            </div>

        </div>
    </div>
  )
}

