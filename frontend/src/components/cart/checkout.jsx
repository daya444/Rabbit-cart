import React, { useState } from 'react'
import { PaypalButton } from './paypalButton'
import { useNavigate } from 'react-router-dom'

const  cart = {
    products : [
        {
          name :"stylish jacket",
          size : "M",
          color : "green",
          price : 120,
          image : "https://picsum.photos/200?random=19"
        },
        {
            
                name :"pant",
                size : "M",
                color : "green",
                price : 120,
                image : "https://picsum.photos/200?random=13"
              

        }
      
    ],
    totalPrice :  240
}



export const Checkout = () => {

    const navigate = useNavigate()

    const [shippingAddress ,setShippinAddress] = useState({
        firstname : "",
        lastname : "",
        address : "",
        city : "",
        postalcode : "",
        country : "",
        phone : "",

    })

    const [checkoutId,setCheckoutId] = useState(null)

    const handleCreateCheckoutId = (e)=> {
        e.preventDefault();
        setCheckoutId(123)
    }

    const handlePaymentSuccess =(Details)=> {

        console.log("payment success" , Details)
        navigate('/order-confirmation')

    }
  return (
    <div className=' grid  grid-cols-1  lg:grid-cols-2 max-w-7xl mx-auto gap-4 py-10 px-6 tracking-tighter'>

        {/* left section */}

        <div className='bg-white rounded p-6'>

            <h2 className='upper text-2xl py-2'>
                Checkout
            </h2>

            <div>
                <h2 className='mb-2 text-lg'>
                    Contact Details
                </h2>

                <form onSubmit={handleCreateCheckoutId}>
                    <label>Email</label>
                    <input  
                    disabled
                    className='w-full border py-2 rounded-md px-3' 
                    value={"user@gmail.com"} />

                    <h3 className='mt-3  text-lg '>Delivery</h3>

                    <div className=' grid grid-cols-2 gap-4 mt-3 mb-4'>

                        <div>
                            <label >First Name</label>
                            <input
                             className='w-full py-2  px-3 rounded-md border' 
                             placeholder='Enter your Firstname'
                             value={shippingAddress.firstname}
                             onChange={(e)=> setShippinAddress({...shippingAddress,firstname : e.target.value})}
                             
                             />
                        </div>

                        <div>
                            <label >Last Name</label>
                            <input 
                            className='w-full py-2  px-3 rounded-md border' 
                            placeholder='Enter your Lasttname'
                            value={shippingAddress.lastname}
                            onChange={(e)=> setShippinAddress({...shippingAddress,lastname : e.target.value})}
                            /> 
                        </div>

                    </div>

                    <div className='mb-4'>
                        <label>Address</label>
                        <input 
                        placeholder='Enter the Address' 
                        className='w-full py-2  px-3 rounded-md border'
                        value={shippingAddress.address}
                        onChange={(e)=> setShippinAddress({...shippingAddress,address : e.target.value})}
                        />
                    </div>

                    <div className=' grid grid-cols-2 gap-4  mt-3 mb-4'>

                            <div>
                                <label >City</label>
                                <input 
                                className='w-full py-2  px-3 rounded-md border' 
                                placeholder='Enter your City'
                                value={shippingAddress.city}
                                onChange={(e)=> setShippinAddress({...shippingAddress,city : e.target.value})}
                                />
                            </div>

                            <div>
                                <label >Postal Code</label>
                                <input 
                                className='w-full py-2  px-3 rounded-md border' 
                                value={shippingAddress.postalcode}
                                onChange={(e)=> setShippinAddress({...shippingAddress,postalcode : e.target.value})}
                                placeholder='Enter your Postal Code'/> 
                            </div>

                    </div>


                    <div className='mb-4'>
                        <label>Country</label>
                        <input 
                        placeholder='Enter the  Country' 
                        className='w-full py-2  px-3 rounded-md border'
                        value={shippingAddress.country}
                        onChange={(e)=> setShippinAddress({...shippingAddress,country : e.target.value})}
                        />
                    </div>

                    <div className='mb-4'>
                        <label>Phone</label>
                        <input 
                        placeholder='Enter the Phone Number' 
                        className='w-full py-2  px-3 rounded-md border'
                        value={shippingAddress.phone}
                        onChange={(e)=> setShippinAddress({...shippingAddress,phone : e.target.value})}
                        />
                    </div>

                  <div>
                    {!checkoutId ? (
                          <button type='submit' className='bg-black w-full mb-4 text-white py-2 text-center hover:bg-gray-600 rounded'>
                          Continue to Payment
                      </button>
                    ) : (
                        <div>
                          <h3 className='mb-4 text-lg'>Pay with PayPal</h3>
                          <PaypalButton amount={1000} onError={(err)=> alert("Payment failed.Try Again")}
                            onSuccess={handlePaymentSuccess}
                            />
  
                        </div>

                    )}
                  </div>

                    
                    

                </form>
            </div>

        </div>


        {/* right section */}

        <div className='bg-green-50 p-4'> 
            <h2 className='py-2'>Order summary</h2>

            <div className='py-4 mb-4 border-t'>
                {cart.products.map((product,index)=>(
                    <div key={index} className='flex items-center justify-between border-b'>

                        <div className='flex items-start py-2  '>
                            <img className='w-20 h-24 object-cover mr-4 rounded' src={product.image}/>
                            <div>
                                 <h3 className='text-md'>{product.name}</h3>
                                 <p className='text-gray-500'>{product.size}</p>
                                 <p className='text-gray-500'>{product.color}</p>
                            </div>
                        </div>

                        <div>
                            <p className='p-2 text-xl'>${product.price}</p>
                        </div>



                    </div>
                ))}

            </div>

            <div className='flex items-center justify-between mb-4'>
                <p>Subtotal</p>
                <p>${cart.totalPrice.toString()}</p>
            </div>
            <div className='flex items-center justify-between mb-4'>
                <p>Shipping</p>
                <p className='text-lg'>free</p>
            </div>

            <div className='flex items-center justify-between mb-4 py-4  border-t'>
            <p>Total</p>
            <p>${cart.totalPrice.toString()}</p>
 
            </div>
        </div>

    </div>
  )
}
