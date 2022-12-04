import React, { useEffect, useState,useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate  } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { fetchProducts } from '../store/productSlice';
const SingleProduct = () => {
    const [product,setProduct]=useState({});
    const params=useParams()
    const navigate = useNavigate();
    const dispatch =useDispatch()
    const {cart:products} =useSelector((state)=>state.cart)
    console.log('hhhhssssshhhhh',products)
useEffect(()=>{
  // dispatch(fetchProducts())
  const products= async ()=>{await dispatch(fetchProducts())}


     fetch(`/api/v1/products/${params._id}`).then(res=> res.json()).then(product=>{
       
        console.log("data before",product)
     
        setProduct(product.product)
       
    })
  
       
},[])
// const {cart,setcart}=useContext(CartContext)
// const addToCart = (event,product)=>{
//     event.preventDefault()
//     let _cart={...cart}
//     if(!_cart.items)
//     {
//       _cart.items={}
//     }
//     if(_cart.items[product._id]){
//       _cart.items[product._id]+=1
//     }
//     else{
//       _cart.items[product._id]=1
//     }
//     if(!_cart.totalItems)
//     {
//       _cart.totalItems=0
//     }
//     _cart.totalItems+=1
//     setcart(_cart)
//   }

// let temp1=product.images
// let temp2={...temp1}
    console.group("selected id",params)
      // console.group("image url",temp2)
  return (
    <div className='container mx-auto mt-12'>
            <button className='mb-12 font-bold' onClick={()=>navigate(-1)}>Back</button>
            <div className='flex'>
            <img className='w-[200px] h-[200px]'  alt='pizza' />
                <div className='ml-16'>
                    <h1 className='text-xl font-bold'>{product.name}</h1>
                    <div className='text-md'>{product.description}</div>
                    <div className='font-bold mt-2'>${product.price}</div>
                    <button  /*onClick={(e)=>{addToCart(e,products)}}*/ className='bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4'>Add to cart</button> 
                </div>

            </div>
            <div><h1>Reviews</h1>
            <p></p>
            </div>
    </div>
  )
}

export default SingleProduct