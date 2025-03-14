import React from 'react'
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

export const Features = () => {
  return (
   
    <section className='py-16 px-4'>
        <div className='container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8'>

            <div>
                <div className='flex flex-col items-center '>

                    <HiShoppingBag className='text-xl mb-4 rounded-full'/>
                    <h2 className='mb-2 tracking-tighter '>
                        FREE INTERNATIONAL SHIPPING
                    </h2>
                    
                    <p className='text-sm tracking-tighter'>
                        On all orders over $100.00
                    </p>

                </div>
            </div>

            <div>
                <div className='flex flex-col items-center '>

                    <HiArrowPathRoundedSquare className='text-xl mb-4 rounded-full'/>
                    <h2 className='mb-2 tracking-tighter '>
                    45 DAYS RETURN
                    </h2>
                    
                    <p className='text-sm tracking-tighter'>
                    Money back gurantee
                    </p>

                </div>
            </div>


            <div>
                <div className='flex flex-col items-center '>

                    <HiOutlineCreditCard className='text-xl mb-4 rounded-full'/>
                    <h2 className='mb-2 tracking-tighter '>
                       SECURE CHECKOUTS 
                    </h2>
                    
                    <p className='text-sm tracking-tighter'>
                       100% Secured checkout process
                    </p>

                </div>
            </div>

        </div>
    </section>
  )
}

