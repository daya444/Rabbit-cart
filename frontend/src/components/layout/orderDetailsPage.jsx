import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderById } from '../../redux/slices/orderSlice'

export const OrderDetailsPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const { orderDetails,loading,error} = useSelector((state)=> state.order)

    useEffect(()=> {
        dispatch(fetchOrderById(id))
    },[dispatch])


if (loading) return <p>loading ...</p>
if(error) return <p>{error}..</p>

  
  return (


    <div className='max-w-6xl p-3 mx-auto'>
         
         <h1 className='font-semibold text-2xl mb-6'>Order Details</h1>

        {!orderDetails ? (<h2>No order Details found</h2>) : (

                <div className='p-4 border rounded'>

                    <div className='flex  flex-col  justify-between mb-8   sm:flex-row '>

                        <div className=''>
                            <h2>Order Id :{orderDetails._id}</h2>
                            <p className='text-gray-500 text-sm'> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className='flex flex-col items-start sm:items-end   mt-4 md:mt-0'>
                           <p className={`${orderDetails.isPaid ? " text-green-700 bg-green-300" : " text-red-700 bg-red-300"} py-1 rounded-lg px-3 text-sm font-medium mb-2`}> {orderDetails.isPaid ? "Approved" : "pending"}</p>
                           <p  className={`${orderDetails.isDelivered ? " text-green-700 bg-green-300" : " text-yellow-500 bg-yellow-200"} py-1 rounded-lg px-3 text-sm font-medium mb-2`}>{orderDetails.isDelivered ? "Delivered successfully" : "Pending delivery"}</p>

                         </div>

                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8'>

                        <div>
                                <h2 className='text-xl font-semibold mb-2'>Payment Info</h2>
                                <p className='text-l text-gray-600 '>Payment Method:{orderDetails.paymentMethod}</p>
                                <p className='text-l text-gray-600'>
                                    Status:{orderDetails.isPaid ? "Paid" : "Unpaid"}
                                </p>
                        </div>

                        <div>
                        <div className='mt-3 md:mt-0'>
                                <h2 className='text-xl font-semibold mb-2'>Shipping Info</h2>
                                <p className='text-l text-gray-600 '>Shipping Method: {orderDetails.shippingMethod}</p>
                                <p className='text-l text-gray-600'>
                                    Address: {orderDetails.shippingAddress.city},{orderDetails.shippingAddress.country}
                                </p>
                        </div>



                            
                        </div>   


                    </div>    

                    <div className='overflow-x-auto'>

                        <table className='min-w-full text-gray-600 mb-4'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className="py-2 px-4">Name</th>
                                    <th className="py-2 px-4">Unit Price</th>
                                    <th className="py-2 px-4">Quantity</th>
                                    <th className="py-2 px-4">Total</th>
                                </tr>
                            </thead>
                            

                            <tbody>
                                {orderDetails.orderItems.map((item,index)=>(
                                    <tr key={index} className='border'>
                                        <td className="py-2 px-4 flex items-center ">
                                            <img className='w-12 h-12 rounded-lg object-cover mr-4' src={item.image} alt={item.name}/>
                                            <Link 
                                            className='hover:underline text-blue-400'
                                            to={`/product/${item._id}`}>{item.name}</Link>
                                        </td>
                                        <td className="py-2 px-4">${item.price}</td>
                                        <td className="py-2 px-4">${item.quantity}</td>
                                        <td className="py-2 px-4">${item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        

                    </div>

                    <Link to="/my-orders" className='hover:underline text-blue-500'>
                    Back to My Order 

                    </Link>


                </div>
        )}


    </div>
  )
}

