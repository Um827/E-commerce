import React from 'react'
import Product from './Product'
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
const Products = () => {
  const dispatch =useDispatch()
  const {data:product} =useSelector((state)=>state.product)
  console.log('product using thubk',product)
useEffect(()=>{
 dispatch(fetchProducts())
  // fetch('/api/products')
  // .then(response=>response.json())
  // .then(products=>{
  //   console.log('products......',products)
  //   setProducts(products);
  // });
},[]);


  return (
    <div className="container mx-auto ">
      <h1 className="text-lg font-bold my-8">Products </h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 my-8 gap-24">
  
      {
         product.map(product=><Product key={product._id} product={product} />)
       } 
 
      </div>
    </div>
  )
}

export default Products