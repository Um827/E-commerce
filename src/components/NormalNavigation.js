import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../CartContext'
import { useSelector } from 'react-redux'
const NormalNavigation = ({ open,setopen }) => {
 // const {cart,setcart}=useContext(CartContext)
 const {totalQuantity}=useSelector((state)=>state.cart)
 const {tQuantity}=useSelector((state)=>state.product)
 console.log('quantity',tQuantity)
 

  console.log('itemssssss',totalQuantity)
  return (
    <div className='flex  item-center justify-between md:mb-9' >
      <ul className={`md:flex sm:pl-[250px] pl-[250px] md:pl-[0px] lg:pl-[0px] md:item-center py-4 pb-12 pb-0 md:static absolute bg-amber-400 md:bg-white lg:bg-white w-full
                     py-4 z-10 w-full left-0 md:w-auto ${open ? 'top-40' : 'top-[-490px]'}`}>

        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/"}>Home</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/products"}>Products</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/login"}>Registration</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/history"}>History</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/orders"}>Orders</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/cart"}>
          <div  className=' bg-amber-500 flex pt-[6px] pl-[12px] pb-[6px] rounded-full w-16'>
            <span><em>{totalQuantity} </em></span>
            <div className="">
            <img className='h-5 md:w-5  ' src='/images/shopping-cart.svg'></img>
            </div>
          </div>
        </Link></li>
      </ul>
    </div>
  )
}

export default NormalNavigation