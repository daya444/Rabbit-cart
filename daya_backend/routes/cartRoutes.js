import express from "express"
import { deleteCart, getCart, mergeGuestCart, postCart, updateCart } from "../controllers/cartProduct.js"
import { protect } from "../middlewares/authMiddleware.js"


const router = express.Router()


router.post("/",postCart)
router.put('/', updateCart)
router.delete("/",deleteCart)
router.get("/",getCart)
router.post("/merge",protect,mergeGuestCart)


export default router

