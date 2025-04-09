import React from 'react'
import { Link } from 'react-router-dom'

export  const ProductGrid = ({product ,loading, error}) => {

    if(loading){
        return <p>Loading..</p>
    }
    if(error){
        return <p>Error : {error}</p>
    }
  return (
    
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {product.map((product,index)=>(
                <Link 
                className='block'
                key={index}
                to={`/product/${product._id}`}>

                    <div className='bg-white p-4 rounded-lg'>

                        <div className='mb-4 w-full h-96'>
                            <img  
                            className='w-full h-full object-cover rounded-lg'
                            src={product?.images[0]?.url} alt={product.name}/>
                        </div>

                        <h3  className='text-sm mb-2'>
                            {product.name}
                        </h3>

                        <p className='text-gray-500 text-sm font-medium tracking-tight'>
                            ${product.price}
                        </p>

                    </div>


                </Link>
            ))}
            

        </div>
    
  )
}

