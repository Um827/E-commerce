//Root Component ,All other will child components and pass through this  
//Functional Components
// <div></div>,<>,</>
import { BrowserRouter as Router,
                          Route, 
                          Routes} from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import ProductsPage from './pages/ProductsPage';
import SingleProduct from './pages/SingleProduct';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { CartContext } from './CartContext';
import { getCart,storeCart } from './Helper';
import Login from './pages/Registration';
import History from './pages/History';
import { Provider } from 'react-redux';
import store from './store/store';
import Orders from './pages/Orders';


function App() {
    const [cart,setcart]= useState({});
    
   
    // // fetch cart from local storage
    // useEffect(()=>{
    //    getCart().then(cart=>{
    //     setcart(JSON.parse(cart))
    //    })
    // },[])

    // useEffect(()=>{
    //     storeCart(JSON.stringify(cart))
    //  },[cart])
    return (
        <div>
            <Provider store={store}>

           
            <Router>
                {/* <CartContext.Provider value={{cart,setcart}}> */}
                    <Navigation/>
                    
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route  path="/cart" element={<Cart/>}></Route>
                        <Route path="/products"  element={<ProductsPage/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/history" element={<History/>}></Route>
                        <Route path="/orders" element={<Orders/>}></Route>
                        <Route path="/products/:_id"  element={<SingleProduct/>}></Route>
                    </Routes>
                {/* </CartContext.Provider> */}
            </Router>
            </Provider>

        </div>
    )
}

export default App;

