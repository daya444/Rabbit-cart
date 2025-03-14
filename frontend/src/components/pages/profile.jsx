import React from 'react'
import { MyOrderPage } from './myOrderPage'

export const Profile = () => {



    return (

        <div className='min-h-screen flex flex-col'>
            <div className='flex-grow border border-red-500 container p-4 md:p-6 '>
                <div className='p-6 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>

                    <div className='border shadow-md px-3 pt-8 w-full md:w-1/3 lg:w-1/4 rounded h-fit'>
                        <div className='flex flex-col   p-6 '>
                            <h2 className='font-bold text-3xl mb-3  sm:text-2xl'>
                                Admin User
                            </h2> 

                            <p className='text-sm mb-4 text-gray-600'>
                                exampledaya@gmail.com
                            </p>
                            <button className='w-full bg-red-500  py-2 hover:bg-red-300 rounded'>
                                Logout
                            </button>

                        </div>
                    </div>

                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <MyOrderPage/>
                    </div>
                    
                </div>

            </div>

        </div>





    )
}

