
import React, { useState } from 'react'

export const EditProduct = () => {

    const[productData,setProductData]=useState({
        name: "",
        description: '',
        price : 0,
        countInStock : 0,
        sku:"",
        category : "",
        brand : "",
        size: [],
        colors : [],
        collections :"",
        material : "",
        gender:"",
        image : [
            {
                url: "https://picsum.photos/200?random=25"
            },
            {
                url: "https://picsum.photos/200?random=2"
            },
            
            
        ]


    })

    const handleProductData = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
        
    };

    const handleImageUpload = async (e)=> {
        const file = e.target.files[0]
       
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(productData)

    }
  return (

    <div className='max-w-7xl p-6'>

        <h2 className='font-semibold text-2xl mb-3'>Edit Product</h2>

        <div className="min-w-full"> 
            <form  onSubmit={handleSubmit} className='w-full '>
                <div className="mb-2">
                    <label className='block mb-2 font-semibold'> Product Name</label>
                    <input
                    required
                    value={productData.name}
                    type='text'
                    name='name'
                    onChange={handleProductData}
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className="mb-2">
                    <label className='block mb-2 font-semibold'>Description</label>
                    <textarea
                    value={productData.description}
                    rows={4}
                    name='description'
                    required
                    onChange={handleProductData}
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className="mb-2">
                    <label className='block mb-2 font-semibold'> Price</label>
                    <input
                    value={productData.price}
                    type='number'
                    name='price'
                    onChange={handleProductData}
                    required
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className="mb-2">
                    <label className='block mb-2 font-semibold'> Count in Stock</label>
                    <input
                    required
                    value={productData.countInStock}
                    type='number'
                    name='countInStock'
                    onChange={handleProductData}
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className="mb-2">
                    <label className='block mb-2 font-semibold'>SKU</label>
                    <input
                    value={productData.sku}
                    type='text'
                    name='sku'
                 
                    onChange={handleProductData}
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className="mb-2">
                    <label className='block mb-2 font-semibold'>Size (comma-seperated)</label>
                    <input
                    value={productData.size.join(',')}
                    type='text'
                    name='size'
                    onChange={(e)=> setProductData((prev)=>(
                        {
                            ...prev,size : e.target.value.split(",").map((size)=> size.trim())
                        }
                    ))}
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className="mb-2">
                    <label className='block mb-2 font-semibold'>Color (comma-seperated)</label>
                    <input
                    value={productData.colors.join(',')}
                    type='text'
                    name='colors'
                    onChange={(e)=> setProductData((prev)=>(
                        {
                            ...prev,colors : e.target.value.split(",").map((Color)=> Color.trim())
                        }
                    ))}
                    className='border w-full p-2 border-gray-500 rounded'
                    />
                </div>

                <div className='mb-6'>
                    <label className='block mb-2 font-semibold'>Upload Image</label>
                    <input type='file' onChange={handleImageUpload}/>

                    <div className='mt-4 flex gap-4'>
                        {productData.image.map((image,index)=>(
                            <div key={index} className="">
                                <img className='h-20 w-30 object-cover rounded-md  border-2' src={image.url} alt='product image'/>
                            </div>
                        ))}

                    </div>

                </div>

                <div>
                    <button type='submit' className='w-full  bg-green-500 hover:bg-green-300 text-white py-2 rounded-lg'>
                        Upadte Product
                    </button>
                </div>
                
                


            </form>


        </div>

    </div>
  )
}
