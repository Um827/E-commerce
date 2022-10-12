import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../CartContext'
const NormalNavigation = ({ open,setopen }) => {
  const cartStyle = {
    background: '#F59E0D',
    display: 'flex',
    padding: '6px 12px',
    borderRadius: '50px',
    width: '60px',
  }
  const { cart } = useContext(CartContext)
  return (
    <div className='flex item-center justify-between md:mb-9' >
      <ul className={`md:flex md:item-center py-4 pb-12 pb-0 md:static absolute bg-white w-full
                     py-4 md:pl-10 pl-7 w-full left-0 md:w-auto ${open ? 'top-40' : 'top-[-490px]'}`}>

        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/"}>Home</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/products"}>Products</Link></li>
        <li className='mx-4 my-6 md:my-0 hover:text-red-500 duration-500'><Link onClick={()=>setopen(false)} to={"/cart"}>
          <div style={cartStyle}>

            <span>{cart.totalItems}</span>
            <img className='h-5 md:w-5' src='/images/shopping-cart.svg'></img>
          </div>
        </Link></li>
      </ul>
    </div>
  )
}

export default NormalNavigation