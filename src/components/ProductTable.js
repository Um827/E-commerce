import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
const ProductTable = () => {
    const [products,setProducts]=useState([])

 const getProducts= async ()=>{
  try{

    fetch(`http://localhost:4000/api/v1/products`)
    .then(res=> res.json())
    .then(product=>{
        setProducts(product.product)
        console.log("Product History",product)
    
    })

  }catch(error){
console.log(error)
  }
 }
 useEffect(()=>{
getProducts()
// console.log(products)
 },[])

 const columns=[
  {
    name:"Country Name",
    selector:(row)=> row.name
  },
  {
    name:"Country Native Name",
    selector:(row)=> row.nativeName
  },
  {
    name:"Country Capital",
    selector:(row)=> row.capital
  },
  {
    name:"Country Flag",
    selector:(row)=> <img width={50} height={50} src={row.flag}/>
  }
 ]
  return(
  <div>
    <DataTable columns={columns} data={products}/>;
    </div>
    )
}

export default ProductTable