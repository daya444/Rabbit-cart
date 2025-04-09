import Sider from 'antd/es/layout/Sider'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ProductGrid } from './productGrid'
import axios from 'axios'
import {useSelector,useDispatch} from "react-redux"
import { useParams } from 'react-router-dom'
import { fetchProductDetils, fetchSimilarProducts } from '../../redux/slices/productSlice'
import { addToCart } from '../../redux/slices/cartSlice'







export const ProductDetails = ({productId}) => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {  similarProduct,selectedProduct,loading,error} = useSelector((state)=>state.product);
    const {guestId,user} = useSelector((state)=>state.auth);
    const [mainImage,setMainImage] = useState("")
    const [selectedSize ,setSelectedSize] = useState("")
    const [selectedColor ,setSelectedColor]= useState("")
    const[quantity ,setQuantity] =useState(1)
    const [isButtonDisabled,setIsButtonDisabled] = useState(false)
 

    const productFetchId = productId || id


  
    

 
    useEffect(()=>{
        

        
        //fetch the product by id
        if(productFetchId){
            dispatch(fetchProductDetils(productFetchId))
            dispatch(fetchSimilarProducts({id : productFetchId}))
        }
        
      

    },[dispatch,productFetchId])

    useEffect(()=>{
        if(selectedProduct?.images?.length > 0 ){
            setMainImage(selectedProduct?.images[0].url)
        }
    },[selectedProduct])

    const handleQuantity =(action)=>{
     
        if(action === "plus"){
            setQuantity((prev)=> prev + 1)
        }
        if(action ==="minus" && quantity > 1){
            setQuantity((prev)=>  prev-1)
        }


    }

    const handleAddtoCart = ()=> {
        if (!selectedColor && !selectedSize){
            toast.error("please select the size and color before adding to cart.",{
                duration : 1000
            })
            return
        }
        setIsButtonDisabled(true)
        
        dispatch(addToCart({
            productId: productFetchId,
            userId: user?._id,
            size: selectedSize,
            color: selectedColor,
            guestId,
            quantity
        }))
        .then(() => {
            toast.success("Item added to cart successfully!", {
                duration: 1000
            });
        })
        .finally(() => {
            setIsButtonDisabled(false)
        });
    }

    if(loading){
        return <p>Loading..</p>
    }
    if(error){
        return <p>Error : {error}</p>
    }

  
    


  return (
    <div className='p-6'>
        {selectedProduct && (
             <div className='mx-auto p-8 rounded-lg max-w-6xl'>
             <div className='flex flex-col md:flex-row'>
                 
                  
                 <div className='hidden  md:flex flex-col space-y-2 mr-6'>
 
                     {selectedProduct.images?.map((image,index)=>(
                         <img 
                         key={index}
                         src={image.url}
                         alt={image.altTest}
                          className={`w-20 h-20 border rounded-lg cursor-pointer object-cover ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                          onClick={()=>setMainImage(image.url)}
                         />
                     ))}
 
                 </div>
 
                 {/* main image */}
 
                 <div className='md:w-1/2'>
                     <div className='mb-4'>
                         <img 
                         className='h-auto w-full rounded object-cover '
                         src={mainImage}/>
 
                     </div>
                 
                 </div>
                 
 
                 {/* mobile screen */}
 
                 <div className='md:hidden flex flex-row space-x-3 mb-4'>
                 {selectedProduct.images?.map((image,index)=>(
                         <img 
                         key={index}
                         src={image.url}
                         alt={image.altTest}
                         className={`w-20 h-20 border rounded-lg cursor-pointer object-cover mt-6 ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                         onClick={()=>setMainImage(image.url)}
                         />
                     ))}
 
                 </div>
 
                 {/* right section */}
 
                 <div className='md:w-1/2 md:ml-10'>
                     <h1 className='text-2xl uppercase  md:text-3xl mb-2'>
                         {selectedProduct.name}
                     </h1> 
                     <p className='line-through text-gray-500 mb-1 '>
                         $ {selectedProduct.originalPrice  && `${selectedProduct.price}`}
                     </p>
                     <p className='text-lg mb-2 text-gray-500'>
                         $ {selectedProduct.discountPrice}
                     </p>
 
                     <p className='text-sm mb-2 text-gray-600'>
                         {selectedProduct.description}
                     </p>
 
                     <div>
                         <p className='text-gray-700 '>
                             color:
 
                         </p>   
                             <div className='flex gap-2 mt-1 '>
                                 {selectedProduct.colors?.map((color)=>(
                                     <button key={color}
                                     onClick={()=>setSelectedColor(color)}
                                     className= {`w-8 h-8 rounded-full  border ${selectedColor ===color ? "ring ring-blue-600" : "border-gray-300"}`}
                                     style={
                                         {
                                             background : color.toLocaleLowerCase(),
                                            
                                             
                                         }
                                     }
                                     >
 
                                     </button>
                                 ))}
 
                             </div>
                       
                     </div>
 
                     <div className='mt-4'>
                         <p className='text-gray-700'>
                             size:
                         </p>
                             <div className= {`flex gap-2 mt-2 `}>
                                 {selectedProduct.sizes?.map((size,index)=>(
 
                                     <button 
                                      onClick={()=>setSelectedSize(size)}
                                     className={`px-4 border py-2 rounded  ${selectedSize === size ? "bg-black text-white" : "bg-slate-100"}`} key={size}>
 
                                         {size}
 
                                     </button>
 
                                 ))}
 
                             </div>
                         
                     </div>
 
                     <div className='mb-6'>
                         <p className='text-gray-700 mb-2'>
                             quantity:
                         </p>
                         <div className='flex items-center gap-2'>
 
                             <button
                             onClick={()=>handleQuantity("minus")}
                             
                             className='py-2 px-2 border bg-slate-300 rounded   hover:bg-gray-200'>
                                 -
                             </button>
 
                             <span className='text-xl '>
                             {quantity}
                             </span>
 
                             <button 
                              onClick={()=>handleQuantity("plus")}
                             className='py-2 px-2 border bg-slate-300 rounded hover:bg-gray-200'>
                                 +
                             </button>
 
                         
                         </div>
                     </div>
                     
 
                     <button 
                     onClick={handleAddtoCart}
                     className={`w-full py-2 bg-black text-white rounded hover:bg-gray-600 ${isButtonDisabled ? "cursor-not-allowed opacity-50" :"hover:bg-gray-900"}`}>
                         {isButtonDisabled ? "Adding..." : "Add to Cart"}
                     </button>
 
                     <div className='mt-10 text-gray-700'>
                         <h3 className='mb-4 font-bold text-xl'> Characteristics:</h3>
 
                         <table className='text-left w-full text-sm text-gray-600'>
                             <tbody>
                                 <tr>
                                     <td className='py-1'>
                                         Brand
                                     </td>
                                     <td className='py-1'>
                                         {selectedProduct.brand}
                                     </td>
                                 </tr>
                                 <tr>
                                     <td className='py-1'>
                                         Material
                                     </td>
                                     <td className='py-1'>
                                         {selectedProduct.material}
                                     </td>
                                 </tr>
                             </tbody>
                         </table>
                     </div>
                 </div> 
 
 
             </div>
 
             <div className='mt-20 '>
 
                 <h2 className='text-center font-bold text-2xl mb-4'>You May Also Know</h2>
                 
                 <ProductGrid product={similarProduct} loading ={loading} error={error}/>
 
 
             </div>
 
 
 
 
 
         </div>

        )}
       
    </div>
  )
}

