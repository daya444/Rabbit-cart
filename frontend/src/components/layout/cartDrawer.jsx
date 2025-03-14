import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { CartContent } from '../cart/cartContent';
import {  useNavigate } from 'react-router-dom';

export const  CartDrawer= ({open,onClose}) => {
  const navigate = useNavigate()

  const handleCheckout = ()=> {
    onClose()
    navigate("/checkout")
  }
 

  return (
    <>
    
      <Drawer  title="Your Cart" onClose={onClose} open={open} >

        
            <CartContent/>
       
     
      <div className=" absolute bottom-0 left-0 w-full  p-4  border-t shadow-2xl bg-white ">
        <button onClick={handleCheckout} className="bg-black text-white w-full rounded font-semibold py-2 hover:bg-gray-700 transition duration-300 ease-in-out">
          Checkout
        </button>
        <p className="text-sm text-gray-500 mt-2 text-center tracking-tighter">
          Shopping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
        
        
      </Drawer>
    </>
  );
};
