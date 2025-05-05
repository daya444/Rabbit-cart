import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import { FilteredSidebar } from '../product/filteredSidebar'
import { SortOption } from '../product/sortOption'
import { ProductGrid } from '../product/productGrid'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductByFilters } from '../../redux/slices/productSlice'

export const CollectionPage = () => {



    const { collection} = useParams();
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const {products ,loading, error} = useSelector((state)=>state.product)
    const queryParams = Object.fromEntries([...searchParams])

    
    const [isSidebarOpen, setIsSidebarOpen]= useState(false)

     const sidebarRef = useRef(null)



     useEffect(()=>{
        dispatch(fetchProductByFilters({collection,...queryParams}))
        
     },[dispatch,collection,searchParams])

    const toggleSideBar = ()=> {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleClickOutside = (e)=>{
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsSidebarOpen(false)
        }
    }
   

    

    useEffect(()=>{
       
        // add event listener

        document.addEventListener("mousedown" ,handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[])


  return (


    <div className='flex flex-col lg:flex-row  '>

        {/* mobile screen */}

      
            <button onClick={ toggleSideBar} className='lg:hidden flex border items-center justify-center p-2'>
                <FaFilter className=' mr-2'/>Filters
            </button>


            {/* filtered sidebar */}

            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed inset-y-0 left-0 w-64 bg-white z-50 transition-transform duration-300 lg:static lg:translate-x-0 overflow-y-auto h-screen `}>
                <FilteredSidebar/>
            </div>


            <div className=''>
                <h2 className='uppercase pl-5'>All Collection</h2>


               {/* sort option */}

                <div>
                     <SortOption/>
                </div>

                {/* productgrid */}
                <ProductGrid product={products} loading ={loading} error={error}/>

            </div>

            
          

       


    </div>
  )
}

