import { useParams } from "react-router-dom"
import axios from 'axios'
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

export const STATUSES=Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading',
})
const productSlice=createSlice({
    name: 'product',
    initialState: {
        data: [],
        data1:[],
        status:STATUSES.IDLE,
    },
    reducers :{
        
        // setPrducts(state,action){
        //     state.data=action.payload; 
        // },
        // setStatus(state,action){
        //     state.status=action.payload; 
        // }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.data=action.payload; 
            state.status=STATUSES.IDLE
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }

})


export const {setPrducts,setStatus}= productSlice.actions;
export default productSlice.reducer;
//THUNKS


export const fetchProducts =createAsyncThunk('products/fetch', async () =>{
            const res = await fetch('http://localhost:4000/api/v1/products');
           
            const data1 =await res.json()
            let temp=data1.products
            console.log('dataaa',temp);
            return temp

})

// export const fetchOrders =createAsyncThunk('orders/fetch',async()=>{
//     const res = await axios.get('http://localhost:4000/api/v1/me');
//     const data =await res.json()

//     console.log('dataaa',data);
//     return data

// })