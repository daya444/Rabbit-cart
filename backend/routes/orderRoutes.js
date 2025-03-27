import express from "express"

import { protect } from "../middlewares/authMiddleware.js"
import { getOrders, orderDetails } from "../controllers/orderProduct.js";


 const router = express.Router();



 router.get("/my-orders",protect,getOrders)
 router.get("/:id",protect,orderDetails)


 export default router