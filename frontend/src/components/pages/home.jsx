import React from 'react'

import { GenderCollectionSection } from '../product/genderCollectionSection'
import {Hero} from "../layout/hero"
import { NewArrivals } from '../product/newArrivals'
import { ProductDetails } from '../product/productDetails'
import { ProductGrid } from '../product/productGrid'
import { FeaturedProducts } from '../product/featuredProducts'
import { Features } from '../product/features'


const similarProduct =[
  {
      _id :1,
      name :"Product 1",
      price : 100 ,
      image :[{url : "https://picsum.photos/200?random=5"}]
  },
  {
      _id :2,
      name :"Product 1",
      price : 100 ,
      image :[{url : "https://picsum.photos/200?random=25"}]
  },
  {
      _id :3,
      name :"Product 1",
      price : 100 ,
      image :[{url : "https://picsum.photos/200?random=35"}]
  },
  {
      _id :4,
      name :"Product 1",
      price : 100 ,
      image :[{url : "https://picsum.photos/200?random=45"}]
  },
  {
    _id :5,
    name :"Product 1",
    price : 100 ,
    image :[{url : "https://picsum.photos/200?random=55"}]
},
{
    _id :6,
    name :"Product 1",
    price : 100 ,
    image :[{url : "https://picsum.photos/200?random=65"}]
},
{
    _id :7,
    name :"Product 1",
    price : 100 ,
    image :[{url : "https://picsum.photos/200?random=75"}]
},
{
    _id :8,
    name :"Product 1",
    price : 100 ,
    image :[{url : "https://picsum.photos/200?random=48"}]
}
]


export  const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>
        <h3 className='text-3xl text-black font-bold text-center mt-6 mb-4'>
          Best Seller 
        </h3>
        <ProductDetails/>

       <div className='container mx-auto'>
          <h3 className='text-center text-3xl  font-bold mb-4'>
              Top Wears For Women
          </h3>
          <ProductGrid product={similarProduct}/>
       </div>

       <FeaturedProducts/>
       <Features/>
    </div>
  )
}

