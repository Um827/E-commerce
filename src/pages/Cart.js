import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
const Cart = () => {
  const dispatch =useDispatch()
  const{ cart:product}=useSelector(state => state.cart)
  // console.log('mmmmmmmmm',product[0].id)
  let total = 0;
  // const [products, setProducts] = useState([]);
  // const { cart, setcart } = useContext(CartContext);

  // const [priceFetched, togglePriceFetched] = useState(false);
  // console.log(cart);
  // console.log("cartcontext", cart);
  // useEffect(() => {
  //   if (!cart.items) {
  //     return;
  //   }
  //   if (priceFetched) {
  //     return;
  //   }
  //   fetch("/api/products/cart-items", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ ids: Object.keys(cart.items)}),
  //   })
  //     .then((res) => res.json())
  //     .then((products) => {
  //       setProducts(products);
  //       console.log(products);
  //       togglePriceFetched(true);
  //     });
  // }, [cart, priceFetched]);
  // const getQty = (productId) => {
  //   return product.cartQuantity;
  // };
  // const increment = (productId) => {
  //   const existingQty = cart.items[productId];
  //   const _cart = { ...cart };
  //   _cart.items[productId] = existingQty + 1;
  //   _cart.totalItems += 1;
  //   console.log("_cartdata", _cart);
  //   setcart(_cart);
  // };
  // const decrement = (productId) => {
  //   const existingQty = product.items[productId];
  //   if (existingQty === 1) {
  //     return;
  //   }
  //   const _cart = { ...product };
  //   _cart.items[productId] = existingQty - 1;
  //   _cart.totalItems -= 1;
  //   console.log("_cartdata", _cart);
  //   // setcart(_cart);
  // };
  const getsum = ( productprice,cartQuantity) => {
    const sum = productprice * cartQuantity;
    total = total + sum;
    return sum;
  };
  const handleRemove=(product)=>{
    dispatch(cartActions.remove(product))
  }

  const dQuantity=(product)=>
  {
    dispatch(cartActions.decrementQuantity(product))
  }
  const iQuantity=(product)=>{
    dispatch(cartActions.incrementseQuantity(product))
  }
  // const handledelete = (pdid) => {
  //   const _cart = { ...cart };
  //   const qty = _cart.items[pdid];
  //   delete _cart.items[pdid];
  //   _cart.totalItems -= qty;
  //   setcart(_cart);
  //   const updatedProductLists = products.filter(
  //     (product) => product._id !== pdid
  //   );
  //   setProducts(updatedProductLists);
  // };
  // const handleOrderNow = () => {
  //   window.alert("Order placed succesfully");
  //   setProducts([]);
  //   setcart({});
  // };
  return product.length ? (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart items</h1>
      <ul>
        {product.map((product) => {
          return (
            <li className="mb-12" key={product.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-[50px] w-[60px]" src={product.image}></img>
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      dQuantity(product);
                    }}
                    className="bg-yellow-500 py-2 rounded-full px-4 leading-none"
                  >
                    -
                  </button>
                  <b className="px-4">
                    {product.cartQuantity}
                    {/* {getQty(product.cartQuantity)} */}
                    </b>
                  <button
                    onClick={() => {
                       iQuantity(product);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full  leading-none"
                  >
                    +
                  </button>
                  <span className="px-6">
                    {/* {product.price * product.cartQuantity} */}
                    $ {getsum( product.price,product.cartQuantity)}
                  </span>
                  <button
                    onClick={() => {
                      handleRemove(product);
                    }}
                    className="bg-red-500 px-4  py-2 rounded-full leading-none text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total: $</b> {total}
      </div>
      <div className="text-right mt-6">
        <button
          // onClick={handleOrderNow}
          className="bg-yellow-500 px-4 py-2 rounded-full  leading-none"
        >
          Order Now
        </button>
      </div>
    </div>
  ) : (
    <img className="mx-auto w-1/2 mt-12" src="/images/index.png" />
  );
};

export default Cart;
