
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetils } from '../../redux/slices/productSlice';
import { updateProduct } from '../../redux/slices/adminProductSlice';
import axios from 'axios';

export const EditProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {selectedProduct,loading,error} = useSelector((state)=>state.product)

    const[productData,setProductData]=useState({
        name: "",
        description: '',
        price : 0,
        countInStock : 0,
        sku:"",
        category : "",
        brand : "",
        sizes: [],
        colors : [],
        collections :"",
        material : "",
        gender:"",
        images : []


    })
     
    const [uploading,setUploading] = useState(false)

    useEffect(()=>{
     if(id){
        dispatch(fetchProductDetils(id))
     }
      
    },[dispatch,id])

    useEffect(()=>{
     if(selectedProduct){
        setProductData(selectedProduct)
        console.log(selectedProduct)
     }
    },[selectedProduct])

    const handleProductData = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
        
    };

    const handleImageUpload = async (e)=> {
        const file = e.target.files[0]
        const formdata = new FormData()

        formdata.append("image",file)
        try {
            setUploading(true)
            const {data} =  await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formdata, 
                {
                  headers: {
                    "Content-Type" : "multipart/form-data"
                  },
                }
              );
              setProductData((pre)=>({
                ...pre,
                images : [...pre.images,{url :data.url,alt :""}]
              }))
              setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
       
    }
    const handleSubmit = (e)=> {
        e.preventDefault();
       dispatch(updateProduct({id,productData}))
       navigate("/admin/products")

    }

    if(loading) return <p>loading ...</p>;
    if(error) return <p>{error}</p>
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
                    value={productData.sizes.join(',')}
                    type='text'
                    name='size'
                    onChange={(e)=> setProductData((prev)=>(
                        {
                            ...prev,sizes : e.target.value.split(",").map((size)=> size.trim())
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

                    {uploading && <p>uploading...</p>}

                    <div className='mt-4 flex gap-4'>
                        {productData.images.map((image,index)=>(
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
