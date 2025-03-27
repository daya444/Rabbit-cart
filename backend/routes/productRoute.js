
import express from "express"

import { admin, protect } from "../middlewares/authMiddleware.js";
import { bestSeller, deleteProduct, filteredProducts, newArrivals, productDetails, similarProduct, singleProduct, updateProduct } from "../controllers/productDetails.js";




const router = express.Router()


router.post("/",protect,admin,productDetails )
router.put("/:id",protect,admin,updateProduct)
router.delete("/:id",protect,admin,deleteProduct)
router.get("/", filteredProducts)
router.get("/best-seller",bestSeller)
router.get("/new-arrivals",newArrivals)
router.get("/:id",singleProduct)
router.get("/similar/:id",similarProduct)




export default router