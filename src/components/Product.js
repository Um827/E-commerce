import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'
import { cartActions } from '../store/cartSlice'
const Product = (probs) => {
  // const { cart, setcart } = useContext(CartContext)
  const dispatch = useDispatch()
  const { product } = probs
  const id = product._id
  const image = product.images[0].url
  const name = product.name
  const price = product.price
  const size = product.size
  // console.log("product image",image)
  // /console.log("copying",id,image,name,price,size);
  //  console.log("destructuring",product._id,product.images[0].url,product.name,product.price,product.size)
  //  console.log('Coming products through probs',product);
  const addCart = () => {
    dispatch(cartActions.addItem({ id, image, name, price, size }))

  }

  // const addToCart = (event, product) => {

  //   event.preventDefault()
  //   //  dispatch()

  //   let _cart = { ...cart }
  //   if (!_cart.items) {
  //     _cart.items = {}
  //   }
  //   if (_cart.items[product._id]) {
  //     _cart.items[product._id] += 1
  //   }
  //   else {
  //     _cart.items[product._id] = 1
  //   }
  //   if (!_cart.totalItems) {
  //     _cart.totalItems = 0
  //   }
  //   _cart.totalItems += 1
  //   setcart(_cart)
  // }
  return (
    <div>

     
  
        <div className='pl-[100px] pr-[140px] sm:pr-[0px] sm:pl-[0px]'>
        <Link to={`/products/${product._id}`}>
          <img className='w-[200px] h-[200px]' src={product.images[0].url} alt='pizza' />
          </Link>
          <div className='text-center'>
            <h2 className="text-lg font-bold py-2">{product.name}</h2>
            <span className='bg-gray-200 py-1 rounded-full text-sm px-4'>{product.description}</span>
          </div>
          <div className='flex justify-between items-center mt-4 '>
            <span>${product.price}</span>
            <a href="#" class="group relative inline-block  underline hover:text-red-500 duration-300">
              <button onClick={addCart} className='bg-yellow-500 py-1 rounded-full px-4 font-bold'>ADD</button>
              <span
                class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">This
                is some extra useful information</span>
            </a>
            
            

          </div>
          <div>
            <h1>Rating</h1>
             {product.ratings}.0
            </div>
        </div>
    
    </div>
  )
}

export default Product