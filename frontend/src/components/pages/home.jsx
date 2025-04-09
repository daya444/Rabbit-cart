import React, { useEffect, useState } from 'react'

import { GenderCollectionSection } from '../product/genderCollectionSection'
import {Hero} from "../layout/hero"
import { NewArrivals } from '../product/newArrivals'
import { ProductDetails } from '../product/productDetails'
import { ProductGrid } from '../product/productGrid'
import { FeaturedProducts } from '../product/featuredProducts'
import { Features } from '../product/features'
import axios from 'axios'
import {useSelector,useDispatch} from "react-redux"
import { fetchProductByFilters } from '../../redux/slices/productSlice'






export  const Home = () => {

    const dispatch = useDispatch()
    const {products ,loading,error} = useSelector((state)=> state.product)
    const [bestSeller ,setBestSeller] = useState(null)

  // This runs whenever products change
    



    useEffect(()=>{
        dispatch(fetchProductByFilters({
            gender : "Women",
            cayegory : "Bottom Wear",
            limit : 8
        }))
        const fetchBestSeller = async()=> {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
                
                setBestSeller(response.data)
               
             
            } catch (error) {
                
                console.error("error while fetch best seller product",error)
            }
        }
        fetchBestSeller()


    },[dispatch])


      
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>
        <h3 className='text-3xl text-black font-bold text-center mt-6 mb-4'>
          Best Seller 
        </h3>
        {bestSeller ?  <ProductDetails productId={bestSeller._id}/> : 
        <p>
            Loading best seller product
         </p>}
       

       <div className='container mx-auto'>
          <h3 className='text-center text-3xl  font-bold mb-4'>
              Top Wears For Women
          </h3>

        <ProductGrid product={products} loading ={loading} error={error}/> 
      
       </div>

       <FeaturedProducts/>
       <Features/>
    </div>
  )
}

