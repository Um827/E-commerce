import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'
const Product = (probs) => {
  const {cart,setcart}=useContext(CartContext)
   const {product}=probs
    const addToCart = (event,product)=>{
      event.preventDefault()
      let _cart={...cart}
      if(!_cart.items)
      {
        _cart.items={}
      }
      if(_cart.items[product._id]){
        _cart.items[product._id]+=1
      }
      else{
        _cart.items[product._id]=1
      }
      if(!_cart.totalItems)
      {
        _cart.totalItems=0
      }
      _cart.totalItems+=1
      setcart(_cart)
    }
  return (
   <Link to={`/products/${product._id}`}>
    <div>
    <img src={product.image} alt='pizza' />
   <div className='text-center'>
   <h2 className="text-lg font-bold py-2">{product.name}</h2>
    <span className='bg-gray-200 py-1 rounded-full text-sm px-4'>{product.size}</span>
   </div>
    <div className='flex justify-between items-center mt-4 '>
      <span>${product.price}</span>
      <button  onClick={(e)=>{addToCart(e,product)}} className='bg-yellow-500 py-1 rounded-full px-4 font-bold'>ADD</button>
    </div>
  </div>
   </Link>
  )
}

export default Product