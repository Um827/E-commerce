import { getCart, storeCart } from '../Helper.js';
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
   cart:[],
   totalQuantity:0,
   totalAmount:0

},
  reducers: {
    add(state, action) {
      state.cart.push(action.payload);
      // storeCart(state)
      
    },
    remove(state, action) {
      const newItem= state.cart.filter((item) => item.id !== action.payload.id);
      state.cart=newItem
      storeCart(state.cart)
     // storeCart(JSON.stringify(cart))
    },
    addItem(state,action)
    {
      console.log("redux cart data",action.payload)
      const itemIndex=state.cart.findIndex(item=>item.id=== action.payload.id)
      console.log("itemIndex",itemIndex)
   
      if(itemIndex>=0){
        state.cart[itemIndex].cartQuantity+=1 

      }
      else{
        const tempProduct={...action.payload,cartQuantity:1}
        console.log("tempProduct",tempProduct);
        state.cart.push(tempProduct);
      }
      storeCart(state.cart)
      // const newItem =action.payload
      // console.log("newItem",action.payload);
      //  const existingItem= state.cart.find(item=>item.id===action.payload.id)
      
      state.totalQuantity++
      // console.log("total quantity",state.totalQuantity)
      // console.log("existingItem",existingItem);
   
      // if(!existingItem)
      // {

        console.log("price",action.payload.price);
        state.totalAmount+=action.payload.price
        console.log('total amount', state.totalAmount);     
        
        


        // state.cart.push({
        //   id:newItem.id,
        //   image:newItem.image,
        //   name:newItem.name,
        //   price:newItem.price,
        //   size:newItem.size,
        //   quantity:1,
        //   totalPrice:newItem.price,
        // }//)
      // }
      // else{
      //   console.log('Before quantity',existingItem.quantity);
      //   existingItem.quantity++
      //   console.log('After quantity',existingItem.quantity);
      //   console.log('Before totalPrice', existingItem.totalPrice);
      //   existingItem.totalPrice=Number(existingItem.totalPrice)+Number(newItem.price)
      //   console.log('After totalPrice', existingItem.totalPrice);
        
      // }
      // state.totalAmount=state.cartItems.reduce((total,item)=>(
      //   total+Number(item.price)*Number(item.quantity)
      // ))
    },
    decrementQuantity(state,action)
    {
      const itemIndex=state.cart.findIndex(item=>item.id=== action.payload.id)
      console.log("itemIndex",itemIndex)
      if(state.cart[itemIndex].cartQuantity>1)
      {
        state.cart[itemIndex].cartQuantity-=1 
      }
      else if(state.cart[itemIndex].cartQuantity===1)
      {
        const nextCartItems=state.cart.filter(
        (cartItem)=>cartItem.id!==action.payload.id
        )
       state.cart=nextCartItems
  
      }
  
    },
    incrementseQuantity(state,action)
    {
      const itemIndex=state.cart.findIndex(item=>item.id=== action.payload.id)
      console.log("itemIndex",itemIndex)
      if(state.cart[itemIndex].cartQuantity>=1)
      {
        state.cart[itemIndex].cartQuantity+=1 
      }
      // else if(state.cart[itemIndex].cartQuantity===1)
      // {
      //   const nextCartItems=state.cart.filter(
      //   (cartItem)=>cartItem.id!==action.payload.id
      //   )
      //  state.cart=nextCartItems
  
      // }
    }

  },
 

});
export const cartActions=cartSlice.actions
export default cartSlice
// export const { add, remove,addItem } = cartSlice.actions;
// export default cartSlice.reducer;



