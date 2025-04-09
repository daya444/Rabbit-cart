import React, { useEffect, useState } from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice'

export const CartContent = ({cart,guestId,userId}) => {

    const dispatch = useDispatch()

    console.log("content ",cart)
    

    const handleAddToCart =(productId,delta,quantity,size,color)=>{

        const newQuantity = quantity + delta
        if(newQuantity >=1){
            dispatch(updateCartItemQuantity({
                productId,
                guestId,
                userId,
                quantity :newQuantity,
                size,
                color
            }))
        }

    }

    const handleRemoveFromCart = ({productId,size,color})=>{
        dispatch(removeFromCart({
               productId,
                guestId,
                userId,
                size,
                color

        }))
    }


    
    

    
   
  return (
     <div className='flex-grow p-4 overflow-y-auto max-h-[80vh]'>
         <div>
          {cart.products.map((product,index)=>(
            <div 
            className='border-b py-4 flex  justify-between items-start'
            key={index}>
                <div className='flex items-center'>
                    <img className='h-24 w-24  border-b shadow-sm rounded' src={product.image} alt={product.name}/>
                </div>

                <div>
                    <h3 className='font-semibold' >{product.name}</h3>
                    <p className='text-sm text-gray-500'>
                        size :{product.size} | color :{product.color}
                    </p>

                    <div className=' flex items-center mt-2 '>
                        <button 
                        onClick={()=>
                            handleAddToCart(
                                product.productId,
                                -1,
                                product.quantity,
                                product.size,
                                product.color
                            )
                        }
                        
                        className='border text-sm px-2 py-1 rounded font-medium'>-</button>
                        <span className='text-sm px-4'>
                            {product.quantity}
                        </span>
                        <button 
                         onClick={()=>
                            handleAddToCart(
                                product.productId,
                                1,
                                product.quantity,
                                product.size,
                                product.color
                            )
                        }
                        
                        className='border text-sm px-2 py-1 rounded font-medium'>+</button>
                    </div>
                </div>

                <div>
                    <p className='font-medium'>
                        {product.price.toLocaleString()}
                    </p>
                    <button 
                   onClick={() =>
                    handleRemoveFromCart({
                      productId: product.productId,
                      size: product.size,
                      color: product.color
                    })
                  }
                  
                    className='h-6 w-6  mt-2 hover:text-red-600'>
                        <RiDeleteBin3Line/>
                    </button>
                </div>



            </div>

        ))}
      </div>
     </div>
  )
}

