import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

export const CartContent = () => {

    const product = [
        {
            productId : 1 ,
            name : "t-shirt",
            size: "m" ,
            color: " red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=1"

 
        }
        ,
        {
            productId : 2 ,
            name : "shirt",
            size: "m" ,
            color: "blue",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=2"

 
        },
        {
            productId : 3 ,
            name : "pant",
            size: "m" ,
            color: "red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=3"

 
        }
        , {
            productId : 4 ,
            name : "t-shirt",
            size: "m" ,
            color: " red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=4"

 
        }
        ,
        {
            productId : 5 ,
            name : "shirt",
            size: "m" ,
            color: "blue",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=5"

 
        },
        {
            productId : 6,
            name : "pant",
            size: "m" ,
            color: "red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=6"

 
        },
        {
            productId : 1 ,
            name : "t-shirt",
            size: "m" ,
            color: " red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=1"

 
        }
        ,
        {
            productId : 2 ,
            name : "shirt",
            size: "m" ,
            color: "blue",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=2"

 
        },
        {
            productId : 3 ,
            name : "pant",
            size: "m" ,
            color: "red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=3"

 
        }
        , {
            productId : 4 ,
            name : "t-shirt",
            size: "m" ,
            color: " red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=4"

 
        }
        ,
        {
            productId : 5 ,
            name : "shirt",
            size: "m" ,
            color: "blue",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=5"

 
        },
        {
            productId : 6,
            name : "pant",
            size: "m" ,
            color: "red",
            quantity : 1,
            price :12,
            image : "https://picsum.photos/200?random=6"

 
        }
    ]
  return (
     <div className='flex-grow p-4 overflow-y-auto max-h-[80vh]'>
         <div>
          {product.map((product,index)=>(
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
                        <button className='border text-sm px-2 py-1 rounded font-medium'>+</button>
                        <span className='text-sm px-4'>
                            {product.quantity}
                        </span>
                        <button  className='border text-sm px-2 py-1 rounded font-medium'>-</button>
                    </div>
                </div>

                <div>
                    <p className='font-medium'>
                        {product.price.toLocaleString()}
                    </p>
                    <button className='h-6 w-6  mt-2 hover:text-red-600'>
                        <RiDeleteBin3Line/>
                    </button>
                </div>



            </div>

        ))}
      </div>
     </div>
  )
}

