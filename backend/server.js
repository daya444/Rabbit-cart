import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import {connectDB }  from "./config/db.js";
import  userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoute.js"


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config()
connectDB()


const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("hello daya")
})

app.use("/api/user" ,userRoutes)
app.use("/api/products",productRoutes)



app.listen(PORT ,()=>{
    console.log(`server is runnning on http://localhost:${PORT}`)
}) 