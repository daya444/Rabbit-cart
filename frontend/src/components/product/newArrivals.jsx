import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const NewArrivals = () => {


    const scrollRef = useRef(null)
    const [isDragging ,setIsDragging]= useState(false)
    const [startX,setStartX]=useState(0)
    const [scrollLeft,setScrollLeft] =useState(false)
    const [canScrollLeft,setCanScrollLeft] = useState(false)
    const [canScrollRight,setCanScrollRight]=useState(true)







    const newArrivals = [
      {
         _id : 1,
         name: "stylis jacket",
         price : 12,
         image : [
            {
                url:"https://picsum.photos/200?random=1",
                alttext :"stylist jacket"
            }
         ]

      },
      {
        _id : 2,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=2",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 3,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=13",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 4,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=14",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 5,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=15",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 6,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=16",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 7,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=17",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 8,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=18",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 9,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=19",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 10,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=110",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 11,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=17",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 12,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=18",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 13,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=19",
               alttext :"stylist jacket"
           }
        ]

     },
     {
        _id : 14,
        name: "stylis jacket",
        price : 12,
        image : [
           {
               url:"https://picsum.photos/200?random=110",
               alttext :"stylist jacket"
           }
        ]

     },


    ]

    const handleMouseDown = (e)=>{
      setIsDragging(true);
      setStartX(e.pagex - scrollRef.current.offSetLeft)
    }
    const handleMouseLeave =()=>{

    }

    const handleMouseMove =()=>{

    }

    const handleMouseUp =()=>{
      
    }

    const scroll = (direction)=>{
       
      const scrollAmt = direction ==="left" ? -300 : 300 
      scrollRef.current.scrollBy({left: scrollAmt ,behaviour :"smooth"})

    }

    const updateScrollButton = ()=>{
      const container = scrollRef.current
     

      if(container){
          const leftscroll = container.scrollLeft
          const rightScrollable = container.scrollWidth > container.scrollLeft + container.clientWidth

          setCanScrollLeft(leftscroll>0)
          setCanScrollRight(rightScrollable)

         
      }
    }


    useEffect(()=>{
      const container  = scrollRef.current;
      if(container){
         container.addEventListener("scroll",updateScrollButton)
         updateScrollButton()
      }
    })
  return (
    <section className=''>
        <div className='container mx-auto text-center relative '>
            <h2 className='mb-4 font-bold text-3xl'>
               Explore New Arrivals
            </h2>

            <p className='text-lg  mb-8 '>
                Discover the latest styles straigt off runways,freshly added to keep your wardrobe on the cutting edge of te fashion
            </p>

            <div className='mb-2 absolute   right-0 bottom-[-35px] flex space-x-2'> 
               <button
                onClick={()=>scroll("left")}
                disabled={!canScrollLeft}
                 className={`border p-2 rounded  ${canScrollLeft ? " bg-white text-black  hover:text-gray-500" :"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                  
                  <FiChevronLeft className='2xl'/>  
               </button>
               <button 
               onClick={()=>scroll("right")}
               
           className={`border p-2 rounded  ${canScrollRight ? " bg-white text-black  hover:text-gray-500" :"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                  <FiChevronRight className='2xl'/>  
               </button>
            </div>

        </div>
    
     <div
     onMouseDown={handleMouseDown}
     onMouseLeave={handleMouseLeave}
     onMouseUp={handleMouseUp}
     onMouseMove={handleMouseMove}
     
     
     ref={scrollRef} className=' container mx-auto overflow-x-scroll flex space-x-6 relative'>
          {newArrivals.map((product,index)=>(
            <div key={product._id} className='min-w-100% sm:min-w-[50%] lg:min-w-[30%] relative'>
                 <img src={product.image[0]?.url} alt={product.name} className='w-full rounded-lg object-cover'/>
                 <div className='absolute bottom-0 right-0 left-0 bg-opacity-0 backdrop-blur-md text-white rounded-b-lg  p-4'>
                   
                   <Link to={`/product/${product._id}`} className='block'>
                            <h4 className='font-medium'>
                                {product.name}
                            </h4>
                            <p className='mt-1'>
                                ${product.price}
                            </p>
                    </Link>
                 </div>

            </div>


          ))}
     </div>
        

    </section>
  )
}

