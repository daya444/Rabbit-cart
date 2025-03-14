
import express from "express"

import { admin, protect } from "../middlewares/authMiddleware.js";
import { deleteProduct, filteredProducts, productDetails, updateProduct } from "../controllers/productDetails.js";




const router = express.Router()


router.post("/",protect,admin,productDetails )
router.put("/:id",protect,admin,updateProduct)
router.delete("/:id",protect,admin,deleteProduct)
router.get("/", filteredProducts)


export default router