import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NormalNavigation from './NormalNavigation'
import { useContext } from 'react'
import { CartContext } from '../CartContext'
const Navigation = () => {

    const cartStyle = {
        background: '#F59E0D',
        display: 'flex',
        padding: '6px 12px',
        borderRadius: '50px',
       
    }
    const {cart} =useContext(CartContext)
    const [open, setOpen] = useState(false);

    return (

        <nav className='container flex-wrap mx-auto md:flex item-center md:justify-between '>
            <div className='flex justify-between items-center w-full'>
                <div>
                    <Link to="/">
                        <span className='text-2xl font-[Poppins] cursor-pointer '>
                            <img className='h-10 inline' style={{ height: 150, width: 150 }} src='/images/pizza_logo.jpg' />
                            Pizza
                        </span>

                    </Link>
                </div>
                <div className=''>
                    <span onClick={() => setOpen(!open)} className='text-3xl cursor-pointer right-8  md:hidden block'>
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </span>
                    <NormalNavigation open={open} setopen={setOpen} />
                </div>

            </div>

            {/* <MobileNavigation/> */}
        </nav>

    )
}

export default Navigation