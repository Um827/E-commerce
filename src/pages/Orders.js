import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../store/productSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const Orders = () => {



      //for login
  let [name,setFullName]=useState('')

  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  //for Signup


  // console.log("value of email",loginValues)
//    let [authMode, setAuthMode] = useState("signin")

//   const changeAuthMode = () => {
//     setAuthMode(authMode === "signin" ? "signup" : "signin")
//   }
  async function handleSubmit(e ){
       e.preventDefault()
    //    const user = {
    //     name: name,
    //     email: email,
    //     password: password,
    //   };
  
    //   axios
    //     .post("/api/v1/register", user)
    //     .then((data) => {
    //       console.log(data);
    //     })
      
      console.log("login",name,email,password)
      let item={
        name,email,password
      }
      console.log("item",item)
      try {
        const response =await fetch('http://localhost:4000/api/v1/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              item
            })
          
        })
        const data =await response.json()
        console.log(data);
      } catch (error) {
        console.log("error",error);
      }
  

  }
    // const dispatch=useDispatch()
    // useEffect(()=>{
    //     dispatch(fetchOrders())
      
    //    },[]);  
    return (
    <div>

<div className="Auth-form-container">
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
          <div className='flex justify-between'>
              <div>
              <h3 className="Auth-form-title">Sign In</h3>
              </div>
              <div class="vl"></div>
              <div className="text-center">
                <h3 className="Auth-form-title" >
                  Sign Up
                </h3>
              </div>
              </div>
              <hr/>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={e=>setFullName({name:e.target.value})}
  
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={e=>setEmail({email:e.target.value})}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={e=>setPassword({password:e.target.value})}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className=" text-black btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Orders