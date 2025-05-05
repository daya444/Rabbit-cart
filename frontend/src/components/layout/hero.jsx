import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProductByFilters } from '../../redux/slices/productSlice';
import { useDispatch } from 'react-redux';


export const Hero = () => {

  
    return (
      <section className='relative'> 
        
          <img src="/assets/rabbit-hero.webp" alt="hero img" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />

          <div className='absolute inset-48 bg-opacity-0 flex items-center justify-center bg-black'>
              <div className='text-center text-white p-6 '>
                <h1 className='text-white text text-4xl uppercase mb-4 md:text-7xl lg:text-9xl'>
                    vacation <br/> ready
                </h1>
                <p className='text-sm  tracting-tighter md:text-lg mb-6'>
                    Explore our  vacation-ready outfits with fast worldwide shipping
                </p>
                 
                 <Link to="/collections/all"  className="px-3 py-2 bg-white text-black hover:text-gray-400 rounded text-lg">
                 Shop Now
                 </Link>
              </div>
          </div>
        
      </section>
    );
  };
  

