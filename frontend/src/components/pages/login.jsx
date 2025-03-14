import React, { useState } from 'react'
import { Link } from 'react-router-dom'

 export  const Login = () => {
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")

  const handleSubmit = (e)=> {
   e.preventDefault()
   console.log("email" ,email , "password" ,password)

  }

  return (
   <div className='flex'>
    <div className='w-full md:w-1/2 flex items-center justify-center p-8 md:p-12'>

        <form onSubmit={handleSubmit} className='w-full max-w-md border p-9 shadow-sm rounded-lg'>

            <div className='flex   justify-center '>

                <h2 className='font-bold text-xl mb-3'>
                    Rabbit
                </h2>
             </div>   
            
                <h2 className='text-3xl font-bold text-center mb-2'>
                    Hey there! 👋
                </h2>
                <p className='text-center mb-6 text-sm'>
                    Enter the Username and Pssword to Login
                </p>

                <div className='mb-4'>
                    <label className='block mb-2 font-semibold'>
                         Email
                    </label>
                    <input
                    value={email}
                    className='border w-full h-9 rounded p-2'
                    type='email'
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Enter the email'
                   
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2 font-semibold'>
                         Password
                    </label>
                    <input
                    value={password}
                   className='border w-full h-9 rounded p-2'
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='Enter the Password'
                   
                    />
                </div>

                <button
                className='bg-black text-white w-full py-2 rounded hover:bg-gray-700 font-semibold'
                type='submit'
                >
                    Sign In
                </button>
            

            <p className='mt-6 text-sm text-center'>
              Don't have an account? <Link
              to="/register"
              className='hover:underline text-blue-700'
              
              >
              Register
              </Link>
            </p>
        </form>
    </div>



    <div className='hidden md:block md:w-1/2 bg-gray-800'>
      <div className='flex h-full items-center justify-center'>
      <img
        className='h-[750px] object-cover w-full '
         src='/assets/login.webp'/>
      </div>
      
    </div>
   </div>
  )
}

