import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import { FilteredSidebar } from '../product/filteredSidebar'
import { SortOption } from '../product/sortOption'
import { ProductGrid } from '../product/productGrid'

export const CollectionPage = () => {

    const [product ,setProduct] = useState([])
    const [isSidebarOpen, setIsSidebarOpen]= useState(false)

     const sidebarRef = useRef(null)


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

    useEffect(()=>{


        setTimeout(()=>{

          let   fetchedProducts= [
                {
                    _id :1,
                    name :"Product 1",
                    price : 100 ,
                    image :[{url : "https://picsum.photos/200?random=5"}]
                },
                {
                    _id :2,
                    name :"Product 1",
                    price : 100 ,
                    image :[{url : "https://picsum.photos/200?random=25"}]
                },
                {
                    _id :3,
                    name :"Product 1",
                    price : 100 ,
                    image :[{url : "https://picsum.photos/200?random=35"}]
                },
                {
                    _id :4,
                    name :"Product 1",
                    price : 100 ,
                    image :[{url : "https://picsum.photos/200?random=45"}]
                },
                {
                  _id :5,
                  name :"Product 1",
                  price : 100 ,
                  image :[{url : "https://picsum.photos/200?random=55"}]
              },
              {
                  _id :6,
                  name :"Product 1",
                  price : 100 ,
                  image :[{url : "https://picsum.photos/200?random=65"}]
              },
              {
                  _id :7,
                  name :"Product 1",
                  price : 100 ,
                  image :[{url : "https://picsum.photos/200?random=75"}]
              },
              {
                  _id :8,
                  name :"Product 1",
                  price : 100 ,
                  image :[{url : "https://picsum.photos/200?random=48"}]
              }
              ]

              setProduct(fetchedProducts)
        },1000)
    },[])
  return (


    <div className='flex flex-col lg:flex-row  '>

        {/* mobile screen */}

      
            <button onClick={ toggleSideBar} className='lg:hidden flex border items-center justify-center p-2'>
                <FaFilter className=' mr-2'/>Filters
            </button>


            {/* filtered sidebar */}

            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed inset-y-0 left-0 w-64 bg-white z-50 transition-transform duration-300 lg:static lg:translate-x-0 overflow-y-auto max-h-screen `}>
                <FilteredSidebar/>
            </div>


            <div className=''>
                <h2 className='uppercase pl-5'>All Collection</h2>


               {/* sort option */}

                <div>
                     <SortOption/>
                </div>

                {/* productgrid */}
                <ProductGrid product={product}/>

            </div>

            
          

       


    </div>
  )
}

