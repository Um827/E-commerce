const express= require("express")
const errorMiddleware=require("./middleware/error")
var cors = require('cors')
const app=express()
const cookieParser=require("cookie-parser")

app.use(express.json())
app.use(cookieParser())
app.use(cors())
//Route Imports
const product=require("./routes/productRoute")
const user =require("./routes/userRoute")
const order = require("./routes/orderRoutes");
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1", order);

//middleware for errors
app.use(errorMiddleware)

module.exports=app