import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../redux/slices/cartSlice'






export const   OrderConfirmation = () => {

    const {checkout}  = useSelector((state)=>state.checkout)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const calculateEstimatedDelivery = (createdAt)=> {
        let orderDate = new Date(createdAt)
        orderDate.setDate(orderDate.getDate()+ 10)
        return orderDate.toLocaleDateString()
    }

   

    useEffect(()=>{

        if(checkout && checkout._id){
            dispatch(clearCart())
        }else{
            navigate("/my-orders")
        }
    },[checkout,dispatch,navigate])

    console.log( "checking",checkout)

  return (
    <div className='max-w-4xl bg-white mx-auto p-6'>

        <h1 className='text-emerald-700 text-center font-bold text-4xl mb-5'>
            Thank You For Your Order
        </h1>

        {checkout && (

            <div className='border rounded p-6'>
                <div className='  flex justify-between mb-20 '>
                    <div>
                        <h2>Order Id: {checkout._id}</h2>
                        <p>Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div>
                        <p className='text-emerald-500 text-sm'>
                            Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                        </p>
                        
                    </div>


                </div>

                <div className='mb-20'>
                  {checkout?.checkoutItems?.map((product,index)=> (
                    <div key={index} className='flex justify-between mb-4 border-b p-2'>
                        <div className='flex items-start'>
                            <img className='w-16 h-16 object-cover mr-4 rounded' src={product.image} alt={product.name}/>

                            <div>
                                <p>{product.name}</p>
                                <p>{product.color} |{product.size}</p>
                            </div>

                         </div>   

                         <div>
                            <p className='text-md '>${product.price}</p>
                            <p className='text-gray-500 text-center text-sm'>Qty: {product.quantity}</p>
                        </div> 
                     </div>   
                  ))}

                </div>

                <div className='grid grid-cols-2 gap-8 '>
                    <div>
                        <h2 className='font-bold'>Payment</h2>
                        <p className='text-sm text-gray-400'>Paypal</p>

                    </div>

                    <div className=''>
                    <h2 className='font-bold'>Delivery</h2>
                    <p className='text-sm text-gray-400'>{checkout?.shippingAddress?.address}</p>
                    <p className='text-sm text-gray-400'>{checkout?.shippingAddress?.city},{checkout?.shippingAddress?.country}</p>
                   
                    </div>
                </div>    

            </div>

        )}

    </div>
  )
}

