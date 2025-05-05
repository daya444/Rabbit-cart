import React from 'react'
import { Link } from 'react-router-dom'

 export const GenderCollectionSection = () => {
  return (
  <section className='py-16 px-4 lg-px-0 '>
    <div className=' container mx-auto flex flex-col md:flex-row gap-8 md:justify-center' >
        <div className='relative flex-1'>
         <img className='w-full h-[700px] object-cover rounded-lg' src='/assets/womens-collection.webp '/>
         <div className='absolute bottom-2 left-4 bg-white p-2 rounded'>
            <h2 className=''>
                Women's Collection
            </h2>
            <Link to="/collections/all?gender=Women" className='underline hover:text-gray-500'>Shop Now</Link>
         </div>
        </div>
        <div className='relative flex-1'>
         <img className='w-full h-[700px] object-cover rounded-lg' src='/assets/mens-collection.webp '/>
         <div className='absolute bottom-2 left-4 bg-white p-2 rounded'>
            <h2 className=''>
                Men's Collection
            </h2>
            <Link to="/collections/all?gender=Men" className='underline hover:text-gray-500'>Shop Now</Link>
         </div>
        </div>
        
    </div>
  </section>
  )
}

