import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { CartContent } from '../cart/cartContent';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const  CartDrawer= ({open,onClose}) => {


  const navigate = useNavigate()
  const {user,guestId} = useSelector((state)=>state.auth)
  const {cart } = useSelector((state)=>state.cart)

  const userId = user ? user._id :null

 

  const handleCheckout = ()=> {
    onClose()
    if(!user){
      navigate("/login?redirect=checkout")
    }else{
      navigate("/checkout")
    }

  }
 

  return (
    <>
    
      <Drawer  title="Your Cart" onClose={onClose} open={open} >

        {
          cart && cart?.products.length > 0 ? (<CartContent cart={cart} userId ={userId} guestId={guestId}/>) : (<p>Your cart is empty</p>)
        }
            
       
      {cart && cart?.products.length > 0 && (

        <>
        <div className=" absolute bottom-0 left-0 w-full  p-4  border-t shadow-2xl bg-white ">
        <button onClick={handleCheckout} className="bg-black text-white w-full rounded font-semibold py-2 hover:bg-gray-700 transition duration-300 ease-in-out">
          Checkout
        </button>
        <p className="text-sm text-gray-500 mt-2 text-center tracking-tighter">
          Shopping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
      
      
      </>)}
      
        
        
      </Drawer>
    </>
  );
};
