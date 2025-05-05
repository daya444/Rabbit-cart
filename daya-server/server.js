import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import {connectDB }  from "./config/db.js";
import  userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRoutes.js"
import checkOutRoutes from "./routes/checkoutRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import subscribeRoute from "./routes/subscribeRoute.js"
import adminRoutes from "./routes/adminRoutes.js"
import adminProductRoutes from "./routes/prductAdminRoutes.js"
import adminOrderRoutes from "./routes/adminOrderRoutes.js"


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
app.use("/api/cart",cartRoutes)
app.use("/api/checkout",checkOutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscribeRoute)


//Admin

app.use("/api/admin/users",adminRoutes)
app.use ("/api/admin/products",adminProductRoutes)
app.use ("/api/admin/orders",adminOrderRoutes)

app.listen(PORT ,()=>{
    console.log(`server is runnning on http://localhost:${PORT}`)
}) 