import React, { use, useEffect } from 'react'
import { MyOrderPage } from './myOrderPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import { clearCart } from '../../redux/slices/cartSlice'

export const Profile = () => {

    const {user} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()


useEffect(()=>{
    if(!user){
      navigate("/login")
    }
},[user,navigate])

const handleLogout = ()=>{
    dispatch(logout());
    dispatch(clearCart())
    navigate("/login")
}


    return (

        <div className='min-h-screen flex flex-col'>
            <div className='flex-grow border border-red-500 container p-4 md:p-6 '>
                <div className='p-6 flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>

                    <div className='border shadow-md px-3 pt-8 w-full md:w-1/3 lg:w-1/4 rounded h-fit'>
                        <div className='flex flex-col   p-6 '>
                            <h2 className='font-bold text-3xl mb-3  sm:text-2xl'>
                               {user?.name}
                            </h2> 

                            <p className='text-sm mb-4 text-gray-600'>
                                {user?.email}
                            </p>
                            <button onClick={handleLogout} className='w-full bg-red-500  py-2 hover:bg-red-300 rounded'>
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

