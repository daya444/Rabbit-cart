import React from 'react'
import { Link } from 'react-router-dom'

export const FeaturedProducts = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container  w-full mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl  bg-green-50 '>


           {/* left hand side */}
            <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                   <h4 className='text-lg font-semibold text-gray-700 mb-2 '>
                     Comfort and Style
                   </h4>

                   <h2 className='mb-6 text-4xl lg:text-6xl font-bold'>
                      Apparel made for your everyday life
                   </h2>

                   <h4 className='mb-6 text-lg text-gray-600'>
                    Discover high quality,comfortable clothing that effortessly 
                    blends fashion and function.Desgined to make you feel great every day.
                   </h4>

                   <Link 
                   to="/collections/all"
                   className=' bg-black text-white px-4 py-3 rounded-lg hover:bg-slate-600 text-lg'>
                   Shop Now
                   </Link>
            </div >
            
               
            <div className='lg:w-1/2'>
            <img 
             className='object-cover rounded-tr-3xl rounded-br-3xl'
            src='/assets/featured.webp'/>
            </div>

        </div>
    </section>
  )
}

