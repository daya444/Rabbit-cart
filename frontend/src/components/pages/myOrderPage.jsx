import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export  const MyOrderPage = () => {


    const [order,setOrder] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{

        setTimeout(()=>{

            const mockOrders = [
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : false,
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                },
                  {
                    _id : 1234,
                    createdAt : new Date(),
                    shippingAddress : {city:"coimbatore" , country : "india"},
                    orderItems : [
                        {
                            name : "product 1",
                            image : "https://picsum.photos/200?random=13"
                        }
                    ],

                    totalPrice : 100,
                    isPaid : true

                }
            ]


            setOrder(mockOrders)

        },1000)
    },[])


const handleRowClick =(id)=>{
    navigate(`/order/${id}`)
}


  return (

    <div className='mx-auto max-w-5xl p-4'>
        
        <h2 className='text-xl md:text-2xl font-bold sm:mb-3'> My Order </h2>

        <div className='relative shadow-md overflow-auto'>

            <table className='min-w-full text-left text-gray-500'>

                <thead className='bg-gray-100 text-gray-700  text-xs uppercase'>
                    
                        <tr className='rounded'>
                            <th className='py-2 px-4 sm:py-3'> Image</th>
                            <th className='py-2 px-4 sm:py-3'> Order Id</th>
                            <th className='py-2 px-4 sm:py-3'> Created </th>
                            <th className='py-2 px-4 sm:py-3'> Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'> Items </th>
                            <th className='py-2 px-4 sm:py-3'> Price</th>
                            <th className='py-2 px-4 sm:py-3'> Status</th>
                            

                        </tr>
                    
                </thead>
                <tbody>
                   {order.length > 0 ? (
                      
                      order.map((order,index)=>(
                        <tr key={index} onClick={()=>handleRowClick(order._id)} className='border-b cursor-pointer hover:bg-gray-50 '>
                            <td className='py-2 px-2 sm:py-4 sm:px-2'>
                                <img
                                className='w-10 h-10 sm:w-12 sm:h-12 rounded object-cover' src={order.orderItems[0].image} alt={order.orderItems.name}/>
                            </td>
                            <td className='px-2 py-2 font-medium text-gray-900 sm:px-4 sm:py-4'>
                                #{order._id}
                            </td>
                            <td className='px-2 py-2 sm:px-4 sm:py-4'>
                                {new Date(order.createdAt).toLocaleDateString()}{""}
                               
                            </td>
                            <td className='px-2 py-2 sm:px-4 sm:py-4'>
                               {order.shippingAddress ? `${order.shippingAddress.city} , ${order.shippingAddress.country} `:("N/A") }
                               
                            </td>

                            <td className='px-2 py-2 sm:px-4 sm:py-4'>
                              {order.orderItems.length}
                               
                            </td>

                            <td className='px-2 py-2 sm:px-4 sm:py-4 '>
                              {order.totalPrice}
                               
                            </td>

                            <td className={`px-2 py-2 sm:px-4 sm:py-4 `}>
                             
                               <span  className={`${order.isPaid ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded-lg text-white`}> {order.isPaid ? "paid" : "pending"}</span>
                            </td>

                        </tr>
                      ))

                   ) : (
                    <tr>
                        <td>
                            You have no order
                        </td>
                    </tr>
                   ) }



                </tbody>




            </table>
         
        </div>

    </div>
  )
}

