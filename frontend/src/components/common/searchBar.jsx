import React, { useState } from 'react'
import {HiMagnifyingGlass, HiMiniXMark} from "react-icons/hi2"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchProductByFilters, setFilters } from '../../redux/slices/productSlice'


export const SearchBar = () => {

    const [isOpen,setIsOpen]= useState(false)
    const [searchTerm,setSearchTerm] =useState("")
    const  dispatch = useDispatch()
    const  navigate = useNavigate()


     const handleSearchToggle = ()=>{
      if(isOpen) setSearchTerm("")
        setIsOpen(!isOpen)
     }

     const handleSearch = (e)=> {
      e.preventDefault();
      console.log( "check",searchTerm)
      dispatch(setFilters({search : searchTerm}))
      dispatch(fetchProductByFilters({search : searchTerm}))
      navigate(`collections/all?search=${searchTerm}`)
      setIsOpen(!isOpen)
     }
 
  return (

    <div className={` flex items-center justify-center w-full transition-all duration-600  ${isOpen ? "absolute left-0 top-0 w-full bg-white h-24 z-50" :"w-auto"}`}>
        {isOpen ? (
          <form onSubmit={handleSearch} className='w-full flex items-center justify-center '>
            <div className='relative w-1/2'>
              <input 
              placeholder='search' 
              type='text' value={searchTerm} 
              onChange={(e)=>{setSearchTerm(e.target.value)}}
              className=' placeholder:text-gray-700 bg-gray-100 rounded-lg w-full focus:outline-none p-2'/>

              <button type='submit' className='absolute right-2  top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <HiMagnifyingGlass className='h-6 w-6'/>
              </button>
            </div>

            
              <button onClick={handleSearchToggle} type='button'>
                 <HiMiniXMark className='h-6 w-6   text-gray-600 hover:text-gray-800'/>
              </button>
            
          

          </form>
        ) : (
            <button  onClick={handleSearchToggle}>
              <HiMagnifyingGlass className='w-6 h-6  text-gray-600 hover:text-gray-800'/>
            </button>
        )}
    </div>
   
  )
}

