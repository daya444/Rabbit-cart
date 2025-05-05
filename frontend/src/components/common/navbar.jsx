import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser ,HiOutlineShoppingBag,HiBars3BottomRight} from "react-icons/hi2"
import { SearchBar } from './searchBar';
import {CartDrawer} from "../layout/cartDrawer"
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';

export const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [navDrawerOpen,setNavDrawerOpen] = useState(false)
   const {cart}= useSelector((state)=>state.cart)
   const {user} = useSelector((state)=>state.auth)

   const cartCount = cart?.products?.reduce((total,product)=>total + product.quantity,0)



  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const toggleNavDrawer = ()=>{
    setNavDrawerOpen(!navDrawerOpen)
  }




  return (
   <>
   <nav className=' container flex items-center justify-between mx-auto mt-2  '>

     <div >
       <Link to="/"  className='text-2xl font-medium flex justify-center items-center gap-1'>
       <img  className='rounded-full h-5 w-5' src='/assets/Rabbit-64.webp'/>
         <span> Rabbit</span>
         
       </Link>
     </div>

     <div className='hidden md:flex space-x-6 '>
        <Link  to='/collections/all?gender=Men' className='text-gray-600 hover:text-black text-sm font-medium uppercase'>
        Mens
        </Link>
        <Link  to='/collections/all?gender=Women' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        women
        </Link>
        <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        Top wear
        </Link>
        <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
        Bottom wear
        </Link>

     </div>

     <div className='flex space-x-4 '>


      {user && user.role ==="admin" && (  <Link to='/admin' className='bg-black text-white px-2 rounded block hover:bg-gray-700'>
          Admin
        </Link>)}
 
        <Link  to="/profile" className='text-black'>
          <HiOutlineUser className=' h-6 w-6 hover:text-gray-700'/> 
        </Link>

        <button onClick={showDrawer} className='relative hover:text-black'>
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
            {cartCount >0  && (
              <span className='absolute bg-red-600 px-2 py-0.3 rounded-full text-xs  text-white top-1'>{cartCount}</span>
            )}
        </button>
      

      <div className='overflow-hidden'>
        <SearchBar/>
      </div>

        
        <button onClick={toggleNavDrawer } className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
        </button>

     </div>

   </nav>

   <CartDrawer open={open} onClose={onClose} />

   {/* mobile screen nav */}
   <div 
   className={`fixed left-0 top-0 w-3/4 sm:w-1/2 md:1/3 h-full transform z-50 bg-white shadow-lg transition-transform duration-300  ${navDrawerOpen? "translate-x-0" : "-translate-x-full"}`}>
     

     <div className='p-3 flex justify-end'>
        <button  onClick={toggleNavDrawer }>
          <IoMdClose className='h-6 w-6 text-gray-600 hover:text-gray-900'/>
        </button>
     </div>
     <div className='p-4'>
      <h2 className='font-bold'>
        Menu
      </h2>

      <nav  className='flex flex-col mt-4 gap-y-4 '  >
        <Link to='/collections/all?gender=Men'onClick={toggleNavDrawer} >
          Men
        </Link>

        <Link  to='/collections/all?gender=Women' onClick={toggleNavDrawer}>
          Women
        </Link>

        <Link to='/collections/all?category=Top Wear' onClick={toggleNavDrawer}>
          Top Wear
        </Link>

        <Link to='/collections/all?category=Bottom Wear' onClick={toggleNavDrawer}>
          Bottom Wear
        </Link>

      </nav>

      
     </div>
   </div>
   </>
  );
};
